import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";

const roleMetricsMap: Record<string, string[]> = {
  Developer: ["DeliveryRate", "CodeQuality", "BugFixRate", "AutomationCoverage"],
  QA: ["TestCaseEffectiveness", "BugDetectionRate", "TestAutomationRate"],
  Manager: ["TeamDeliveryRate", "TeamEngagement", "StrategicInitiatives"],
};

export function AddOrganization() {
  const [organizationName, setOrganizationName] = useState("");
  const [department, setDepartment] = useState("");
  const [managerName, setManagerName] = useState("");
  const [employees, setEmployees] = useState<any[]>([]);
  const [currentEmployee, setCurrentEmployee] = useState<any>({
    name: "",
    employeeId: "",
    gender: "",
    role: "",
    payGrade: "",
    totalExperience: "",
    workExperience: "",
    lastCyclePromotion: "",
    thisCyclePromotion: "",
    clientRating: "",
    performanceRating: "",
    metrics: {},
  });

  const handleMetricChange = (metricName: string, value: string) => {
    setCurrentEmployee((prev: any) => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [metricName]: value,
      },
    }));
  };

  const addEmployee = () => {
    if (!currentEmployee.role || Object.keys(currentEmployee.metrics).length === 0) {
      alert("Role and metrics are required!");
      return;
    }
    setEmployees((prev) => [...prev, currentEmployee]);
    setCurrentEmployee({
      name: "",
      employeeId: "",
      gender: "",
      role: "",
      payGrade: "",
      totalExperience: "",
      workExperience: "",
      lastCyclePromotion: "",
      thisCyclePromotion: "",
      clientRating: "",
      performanceRating: "",
      metrics: {},
    });
  };

  const submitOrganization = async () => {
    const payload = {
      organizationName,
      department,
      managerName,
      employees,
    };
    try {
      await axios.post("http://localhost:8000/add-organization", payload);
      alert("Organization data submitted successfully!");
      setOrganizationName("");
      setDepartment("");
      setManagerName("");
      setEmployees([]);
    } catch (error) {
      console.error(error);
      alert("Failed to submit organization data.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Add Organization Data</h1>

      {/* Organization Details */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Organization Name" value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} />
          <Input placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
          <Input placeholder="Manager Name" value={managerName} onChange={(e) => setManagerName(e.target.value)} />
        </CardContent>
      </Card>

      {/* Add Employee */}
      <Card>
        <CardHeader>
          <CardTitle>Add Employee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Employee Name" value={currentEmployee.name} onChange={(e) => setCurrentEmployee({...currentEmployee, name: e.target.value})} />
          <Input placeholder="Employee ID" value={currentEmployee.employeeId} onChange={(e) => setCurrentEmployee({...currentEmployee, employeeId: e.target.value})} />
          <Select onValueChange={(value) => setCurrentEmployee({...currentEmployee, gender: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setCurrentEmployee({...currentEmployee, role: value, metrics: {}})}>
            <SelectTrigger>
              <SelectValue placeholder="Select Role / Skill Set" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(roleMetricsMap).map((role) => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input placeholder="Pay Grade" value={currentEmployee.payGrade} onChange={(e) => setCurrentEmployee({...currentEmployee, payGrade: e.target.value})} />
          <Input placeholder="Total Experience (Years)" value={currentEmployee.totalExperience} onChange={(e) => setCurrentEmployee({...currentEmployee, totalExperience: e.target.value})} />
          <Input placeholder="Work Experience (Years)" value={currentEmployee.workExperience} onChange={(e) => setCurrentEmployee({...currentEmployee, workExperience: e.target.value})} />
          <Select onValueChange={(value) => setCurrentEmployee({...currentEmployee, lastCyclePromotion: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Last Cycle Promotion (Yes/No)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setCurrentEmployee({...currentEmployee, thisCyclePromotion: value})}>
            <SelectTrigger>
              <SelectValue placeholder="This Cycle Promotion (Yes/No)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Client Rating (1-5)" value={currentEmployee.clientRating} onChange={(e) => setCurrentEmployee({...currentEmployee, clientRating: e.target.value})} />
          <Input placeholder="Performance Rating (1-5)" value={currentEmployee.performanceRating} onChange={(e) => setCurrentEmployee({...currentEmployee, performanceRating: e.target.value})} />

          {/* Metrics Fields */}
          {currentEmployee.role && roleMetricsMap[currentEmployee.role]?.map((metric) => (
            <div key={metric}>
              <Label>{metric}</Label>
              <Input placeholder={`Enter ${metric}`} value={currentEmployee.metrics[metric] || ""} onChange={(e) => handleMetricChange(metric, e.target.value)} />
            </div>
          ))}

          <Button onClick={addEmployee} className="mt-4">Add Employee</Button>
        </CardContent>
      </Card>

      {/* Submit Organization */}
      <Button onClick={submitOrganization} className="w-full text-lg">Submit Organization</Button>
    </div>
  );
}
