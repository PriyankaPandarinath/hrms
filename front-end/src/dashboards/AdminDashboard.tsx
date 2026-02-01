import React from "react";
import {
  Users,
  UserCog,
  UserCheck,
  Clock,
  Calendar,
  TrendingUp,
  AlertCircle,
  Building2,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

/* ---------------- MOCK DATA ---------------- */

const summaryStats = [
  {
    title: "Total Employees",
    value: 128,
    icon: Users,
    color: "text-primary",
  },
  {
    title: "Active Employees",
    value: 120,
    icon: UserCheck,
    color: "text-success",
  },
  {
    title: "HR Count",
    value: 6,
    icon: UserCog,
    color: "text-info",
  },
  {
    title: "Managers",
    value: 12,
    icon: Building2,
    color: "text-warning",
  },
];

const attendanceStats = {
  todayPercentage: 92,
  present: 118,
  absent: 10,
};

const departmentDistribution = [
  { department: "Engineering", count: 48 },
  { department: "Sales", count: 32 },
  { department: "Operations", count: 24 },
  { department: "HR", count: 12 },
  { department: "Finance", count: 12 },
];

const pendingLeaves = [
  {
    id: "LV-1023",
    employee: "Sneha Reddy",
    department: "Engineering",
    days: 2,
    type: "Casual Leave",
  },
  {
    id: "LV-1024",
    employee: "Amit Patel",
    department: "Sales",
    days: 1,
    type: "Sick Leave",
  },
  {
    id: "LV-1025",
    employee: "Ravi Kumar",
    department: "Operations",
    days: 3,
    type: "Earned Leave",
  },
];

const recentActivities = [
  {
    message: "New employee onboarded – Priya Sharma",
    time: "Today, 10:30 AM",
  },
  {
    message: "Leave approved for Sneha Reddy",
    time: "Yesterday",
  },
  {
    message: "Attendance updated for Sales department",
    time: "2 days ago",
  },
];

/* ---------------- COMPONENT ---------------- */

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Branch-level overview and daily operations
          </p>
        </div>

        {/* Quick Actions */}
        {/* <div className="flex gap-2">
          <Button className="bg-accent">
            <Plus className="h-4 w-4 mr-2" />
            Add HR
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Manager
          </Button>
        </div> */}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat) => (
          <Card key={stat.title} className="card-hover">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-muted">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Attendance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Today Attendance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Attendance Percentage
            </span>
            <span className="font-semibold">
              {attendanceStats.todayPercentage}%
            </span>
          </div>
          <Progress value={attendanceStats.todayPercentage} />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            <div>
              <p className="text-xs text-muted-foreground">Present</p>
              <p className="font-semibold">{attendanceStats.present}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Absent</p>
              <p className="font-semibold">{attendanceStats.absent}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Late</p>
              <p className="font-semibold">6</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">On Leave</p>
              <p className="font-semibold">4</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Department-wise Employees</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {departmentDistribution.map((dept) => (
              <div key={dept.department}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{dept.department}</span>
                  <span className="font-medium">{dept.count}</span>
                </div>
                <Progress
                  value={(dept.count / 128) * 100}
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Leaves */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Leave Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingLeaves.map((leave) => (
              <div
                key={leave.id}
                className="flex items-start justify-between p-3 rounded-lg border"
              >
                <div>
                  <p className="font-medium">{leave.employee}</p>
                  <p className="text-xs text-muted-foreground">
                    {leave.department} • {leave.type}
                  </p>
                </div>
                <Badge variant="secondary">{leave.days} day(s)</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Alerts & Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <AlertCircle className="h-5 w-5 text-warning" />
              <p className="text-sm">
                3 employees have not punched in today
              </p>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <TrendingUp className="h-5 w-5 text-info" />
              <p className="text-sm">
                Attendance improved by 4% this week
              </p>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Calendar className="h-5 w-5 text-destructive" />
              <p className="text-sm">
                Payroll cutoff approaching in 2 days
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
