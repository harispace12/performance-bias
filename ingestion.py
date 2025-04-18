import pandas as pd
import os
from pydantic import BaseModel,field_validator
from typing import List
import logging
import uuid
from fastapi import HTTPException

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Pydantic model for data validation
class EmployeeRecord(BaseModel):
    EmployeeID: str
    EmployeeName: str
    ManagerName: str
    TeamName: str
    Gender: str
    SkillSet: str
    TotalExperienceYears: float
    WorkExperienceYears: float
    PayGrade: str
    LastCyclePromoted: str
    PromotionThisCycle: str
    PerformanceRating: int
    WeightedPerformanceScore: float = None
    RequirementClarityIndex: float = None
    ClientFeedbackScore: float = None
    DeliveryTimeliness: float = None
    ChangeRequestRate: float = None
    PerformanceBias: int = None
    PromotionBias: int = None
    GenderBias: int = None

    @field_validator('Gender')
    def validate_gender(cls, v):
        if v not in ['Male', 'Female']:
            raise ValueError('Gender must be Male or Female')
        return v

    @field_validator('SkillSet')
    def validate_skillset(cls, v):
        valid_skills = ['Business Analyst', 'Tester', 'Developer', 'HR', 'Support Engineer', 'Finance', 'DevOps']
        if v not in valid_skills:
            raise ValueError(f'SkillSet must be one of {valid_skills}')
        return v

    @field_validator('PerformanceRating')
    def validate_rating(cls, v):
        if v < 1 or v > 5:
            raise ValueError('PerformanceRating must be between 1 and 5')
        return v

class DataIngestion:
    def __init__(self):
        self.raw_data_dir = "data/raw"
        self.processed_data_dir = "data/processed"
        os.makedirs(self.raw_data_dir, exist_ok=True)
        os.makedirs(self.processed_data_dir, exist_ok=True)

    def validate_and_store(self, file_content):
        """Validate and store raw data, return a unique upload ID."""
        try:
            # Read the file content (assuming it's a string or file-like object)
            df = pd.read_csv(file_content)
            
            # Basic validation (e.g., required columns)
            required_columns = ['EmployeeID', 'EmployeeName', 'Gender', 'TeamName', 'PromotionThisCycle']
            if not all(col in df.columns for col in required_columns):
                raise ValueError("Missing required columns")
            
            # Generate unique upload ID
            upload_id = str(uuid.uuid4())
            raw_path = os.path.join(self.raw_data_dir, f"{upload_id}.csv")
            df.to_csv(raw_path, index=False)
            logger.info(f"Raw data stored at {raw_path} with upload_id {upload_id}")
            return upload_id
        except Exception as e:
            logger.error(f"Validation or storage failed: {str(e)}")
            raise

    def retrieve_data(self, upload_id):
        """Retrieve raw data by upload ID."""
        raw_path = os.path.join(self.raw_data_dir, f"{upload_id}.csv")
        if os.path.exists(raw_path):
            try:
                df = pd.read_csv(raw_path)
                logger.info(f"Retrieved raw data for upload_id {upload_id}")
                return df
            except Exception as e:
                logger.error(f"Error retrieving data: {str(e)}")
                raise
        else:
            logger.error(f"No data found for upload_id {upload_id}")
            raise FileNotFoundError(f"Data not found for upload_id {upload_id}")