// pages/Dashboard.tsx
import { fetchBiasByTeam, fetchBiasCases, fetchDashboardSummary, fetchPromotionStats } from "@/api/apiService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const kpis = [
  { title: "Total Employees", value: 1000 },
  { title: "Teams Analyzed", value: 25 },
  { title: "Bias Detected %", value: "12%" },
  { title: "Promotions Given", value: 150 },
];

// const teamBiasData = [
//   { team: "Alpha", bias: 10 },
//   { team: "Beta", bias: 18 },
//   { team: "Gamma", bias: 7 },
//   { team: "Delta", bias: 14 },
// ];

// const genderPromotionData = [
//   { gender: "Male", value: 60 },
//   { gender: "Female", value: 40 },
// ];

const COLORS = ["#8884d8", "#82ca9d"];

export function Dashboard() {

  const [summary, setSummary] = useState({"total_employees":0,"total_teams":0,"promotions_given":0,"bias_detected":0});
// const [view, setView] = useState('');
// const [data, setData] = useState<any[]>([]);
const [genderPromotionData, setgenderPromotionData] = useState<any[]>([
  { gender: "Male", value: 0 },
  { gender: "Female", value: 0 }
]);
const [teamBiasData, setBiasCases] = useState<any[]>([]);

useEffect(() => {
  fetchDashboardSummary().then(res => setSummary(res.data));
  fetchPromotionStats().then(res => setgenderPromotionData(res.data));
  fetchBiasByTeam().then(res => setBiasCases(res.data));
}, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* {kpis.map((kpi) => (
          <Card key={kpi.title} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{kpi.value}</CardContent>
          </Card>
        ))} */}
         <Card key="Total Employees" className="shadow-md">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{summary.total_employees}</CardContent>
          </Card>
          <Card key="Teams Analyzed" className="shadow-md">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Teams Analyzed</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{summary.total_teams}</CardContent>
          </Card>
          <Card key="BiasDetected" className="shadow-md">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Bias Detected %</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{summary.bias_detected}</CardContent>
          </Card>
          <Card key="Promotions Given" className="shadow-md">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Promotions Given</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{summary.promotions_given}</CardContent>
          </Card>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Team Bias Bar Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Bias by Team</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamBiasData}>
                <XAxis dataKey="team" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="performanceBias" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gender vs Promotion Pie Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Gender vs Promotion Ratio</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={genderPromotionData} dataKey="value" nameKey="gender" cx="50%" cy="50%" outerRadius={100} label>
                  {genderPromotionData && genderPromotionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}