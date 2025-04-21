import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { DataGrid } from "@mui/x-data-grid";

export function EmployeeDeepDive() {
  const columns = [
  { field: 'employee', headerName: 'Employee Name', width: 180 },
  { field: 'team', headerName: 'Team', width: 120 },
  { field: 'gender', headerName: 'Gender', width: 100 },
  { field: 'promotion', headerName: 'Promoted', width: 120 },
  { field: 'biasDetected', headerName: 'Bias Detected', width: 150 },
];

const rows = [
  { id: 1, employee: "John Doe", team: "Alpha", gender: "Male", promotion: "Yes", biasDetected: "No" },
  { id: 2, employee: "Jane Smith", team: "Beta", gender: "Female", promotion: "No", biasDetected: "Yes" },
];
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Employee Deep Dive</h1>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Employee Bias Analysis</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
        <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">promotion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">biasDetected</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="px-6 py-4 whitespace-nowrap">{row.employee}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.team}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.promotion}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.biasDetected}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}