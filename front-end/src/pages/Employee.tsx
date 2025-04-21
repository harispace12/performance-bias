import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { data } from 'react-router-dom';

interface Metric {
  name: string;
  score: number;
  type: string;
}

interface EmployeeData {
  employee_id: string;
  employee_name: string;
  manager_name: string;
  team_name: string;
  gender: string;
  role: string;
  skill_set: string[];
  pay_grade: string;
  total_experience_years: number | '';
  work_experience_years: number | '';
  last_cycle_promoted: boolean;
  promotion_this_cycle: boolean;
  performance_rating: number | '';
  metrics: Metric[];
  review_text: string;
}

const EmployeeAddForm: React.FC = () => {
  const [employeeData, setEmployeeData] = useState<EmployeeData>({
    employee_id: '',
    employee_name: '',
    manager_name: '',
    team_name: '',
    gender: '',
    role: '',
    skill_set: [],
    pay_grade: '',
    total_experience_years: '',
    work_experience_years: '',
    last_cycle_promoted: false,
    promotion_this_cycle: false,
    performance_rating: '',
    metrics: [],
    review_text: ''
  });

  const [currentMetric, setCurrentMetric] = useState<Metric>({ name: '', score: 0, type: '' });
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:8001/get_roles');
        setRoles(response.data);  // Save the roles
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
  
    fetchRoles();
  }, []);

  const handleChange =  (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setEmployeeData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (name === 'role') {
        setEmployeeData(prev => ({
          ...prev,
          role: value,
          metrics: []  // Clear previous metrics
        }));
      
        try {
           axios.get(`http://localhost:8001/get_metrics_by_role?role=${value}`).then(data => {

            setEmployeeData(prev => ({
                ...prev,
              
                metrics: data.data.metrics  // Load metrics from DB
              }));
          });
       
        } catch (error) {
          console.error('Error fetching metrics for role:', error);
        }
      }
  };

  const handleSkillSetChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmployeeData(prev => ({
      ...prev,
      skill_set: value.split(',').map(skill => skill.trim())
    }));
  };

  const addMetric = () => {
    if (currentMetric.name && currentMetric.score && currentMetric.type) {
      setEmployeeData(prev => ({
        ...prev,
        metrics: [...prev.metrics, currentMetric]
      }));
      setCurrentMetric({ name: '', score: 0, type: '' });
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8001/add_employee', employeeData);
      alert('Employee added successfully!');
      setEmployeeData({
        employee_id: '',
        employee_name: '',
        manager_name: '',
        team_name: '',
        gender: '',
        role: '',
        skill_set: [],
        pay_grade: '',
        total_experience_years: '',
        work_experience_years: '',
        last_cycle_promoted: false,
        promotion_this_cycle: false,
        performance_rating: '',
        metrics: [],
        review_text: ''
      });
    } catch (err) {
      alert('Failed to add employee');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Employee</h1>
      <div className="grid grid-cols-2 gap-4">
        <input name="employee_id" value={employeeData.employee_id} onChange={handleChange} placeholder="Employee ID" className="border p-2 rounded" />
        <input name="employee_name" value={employeeData.employee_name} onChange={handleChange} placeholder="Employee Name" className="border p-2 rounded" />
        <input name="manager_name" value={employeeData.manager_name} onChange={handleChange} placeholder="Manager Name" className="border p-2 rounded" />
        <input name="team_name" value={employeeData.team_name} onChange={handleChange} placeholder="Team Name" className="border p-2 rounded" />
        <select name="gender" value={employeeData.gender} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {/* <input name="role" value={employeeData.role} onChange={handleChange} placeholder="Role" className="border p-2 rounded" /> */}
        <select name="role" value={employeeData.role} onChange={handleChange} className="border p-2 rounded">
  <option value="">Select Role</option>
  {roles.map((role) => (
    <option key={role} value={role}>{role}</option>
  ))}
</select>
        <input name="pay_grade" value={employeeData.pay_grade} onChange={handleChange} placeholder="Pay Grade" className="border p-2 rounded" />
        <input name="skill_set" value={employeeData.skill_set.join(',')} onChange={handleSkillSetChange} placeholder="Skill Set (comma separated)" className="border p-2 rounded" />
        <input name="total_experience_years" value={employeeData.total_experience_years} onChange={handleChange} placeholder="Total Experience (Years)" type="number" className="border p-2 rounded" />
        <input name="work_experience_years" value={employeeData.work_experience_years} onChange={handleChange} placeholder="Work Experience (Years)" type="number" className="border p-2 rounded" />
        <input name="performance_rating" value={employeeData.performance_rating} onChange={handleChange} placeholder="Performance Rating (1-5)" type="number" className="border p-2 rounded" />
        <textarea name="review_text" value={employeeData.review_text} onChange={handleChange} placeholder="Review Text" className="border p-2 rounded col-span-2" />
      </div>

      <div className="my-4">
        <h2 className="text-lg font-semibold">Add Metric</h2> 
        {employeeData.metrics && employeeData.metrics.map((metric, idx) => (
        <div className="grid grid-cols-2 gap-4">
       
        
                      <input value={metric.name} onChange={(e) => setCurrentMetric(prev => ({ ...prev, name: e.target.value }))} placeholder="Metric Name" className="border p-2 rounded" />
                      <input type="number" value={metric.score} onChange={(e) => {
                const newMetrics = [...employeeData.metrics];
                newMetrics[idx].score = parseFloat(e.target.value);
                setEmployeeData(prev => ({ ...prev, metrics: newMetrics }));
              }} className="border p-1 rounded w-20" />
                      
        
          {/* <input value={currentMetric.name} onChange={(e) => setCurrentMetric(prev => ({ ...prev, name: e.target.value }))} placeholder="Metric Name" className="border p-2 rounded" />
          <input value={currentMetric.score} type="number" onChange={(e) => setCurrentMetric(prev => ({ ...prev, score: parseFloat(e.target.value) || 0 }))} placeholder="Score" className="border p-2 rounded" />
          <select value={currentMetric.type} onChange={(e) => setCurrentMetric(prev => ({ ...prev, type: e.target.value }))} className="border p-2 rounded">
            <option value="">Type</option>
            <option value="General">General</option>
            <option value="Skill">Skill</option>
          </select> */}
          {/* <button onClick={addMetric} className="bg-blue-600 text-white px-4 rounded">Add Metric</button> */}
        </div>  ))}
        {/* <div className="mt-2">
          {employeeData.metrics.map((metric, idx) => (
            <div key={idx} className="text-sm text-gray-700">{metric.name} ({metric.type}) - {metric.score}</div>
          ))}
        </div> */}
      </div>

      <button onClick={handleSubmit} className="mt-6 bg-green-600 text-white px-6 py-2 rounded">
        Submit Employee
      </button>
    </div>
  );
};

export default EmployeeAddForm;
