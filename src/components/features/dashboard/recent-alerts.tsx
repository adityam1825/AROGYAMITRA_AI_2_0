import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Siren } from "lucide-react";

const alerts = [
  {
    name: "Dr. Anya Sharma",
    role: "Cardiology",
    message: "Staffing alert: Cardiology dept requires 2 additional nurses for the night shift.",
    time: "5m ago",
  },
  {
    name: "System",
    role: "Supply Chain",
    message: "Low stock warning: Oxygen cylinders below 20% capacity at Sion Hospital.",
    time: "30m ago",
  },
  {
    name: "Mumbai Health Dept",
    role: "Public Advisory",
    message: "Air quality alert issued for the next 48 hours. Advise vulnerable patients.",
    time: "1h ago",
  },
];

export function RecentAlerts() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <Siren className="h-6 w-6 text-destructive" />
            <CardTitle>Recent Alerts</CardTitle>
        </div>
        <CardDescription>Automated notifications and critical updates.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className="flex items-start space-x-4">
            <Avatar className="h-9 w-9">
                <AvatarFallback>{alert.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium leading-none">{alert.name}</p>
                <p className="text-sm text-muted-foreground">{alert.time}</p>
              </div>
              <p className="text-sm text-muted-foreground">{alert.message}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
