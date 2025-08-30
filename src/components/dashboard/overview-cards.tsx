import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BedDouble, Droplets, CalendarDays } from "lucide-react";

const overviewData = [
  {
    title: "Total Admissions (24h)",
    value: "1,204",
    change: "+15.2% from yesterday",
    icon: Users,
  },
  {
    title: "Bed Occupancy",
    value: "82%",
    change: "7,382 / 9,000 beds",
    icon: BedDouble,
  },
  {
    title: "AQI Mumbai",
    value: "158",
    change: "Unhealthy",
    icon: Droplets,
  },
  {
    title: "Upcoming Major Event",
    value: "Ganesh Chaturthi",
    change: "in 12 days",
    icon: CalendarDays,
  },
];

export function OverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {overviewData.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">{item.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
