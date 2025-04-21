import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataGrid } from "@mui/x-data-grid";
export function TeamAnalysis() {
    const columns = [
        { field: 'team', headerName: 'Team', width: 150 },
        { field: 'biasScore', headerName: 'Bias Score', width: 130 },
        { field: 'genderBias', headerName: 'Gender Bias %', width: 160 },
        { field: 'promotionBias', headerName: 'Promotion Bias %', width: 180 },
      ];
  const rows = [
    { id: 1, team: "Alpha", biasScore: 8, genderBias: 12, promotionBias: 15 },
    { id: 2, team: "Beta", biasScore: 15, genderBias: 18, promotionBias: 22 },
    { id: 3, team: "Gamma", biasScore: 5, genderBias: 7, promotionBias: 9 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Team Bias Analysis</h1>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Teamwise Bias Summary</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
        <DataGrid
            rows={rows}
            columns={columns}
            paginationModel={{ pageSize: 5, page: 0 }}
            pageSizeOptions={[5, 10, 20]}
          />
        </CardContent>
      </Card>
    </div>
  );
}