import { useState } from "react";
import { Plus, Edit, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ---------------- TYPES ---------------- */

interface Department {
  id: string;
  name: string;
  code: string;
  branch: string;
  hodName: string;
  hodEmployeeId: string;
  reportingHierarchy: string;
  location: string;
  email?: string;
  phone?: string;
  status: "Active" | "Inactive";
}

/* ---------------- MOCK DATA ---------------- */

const branches = ["Hyderabad", "Bangalore", "Vizag"];

const initialDepartments: Department[] = [
  {
    id: "1",
    name: "Service",
    code: "SERV",
    branch: "Hyderabad",
    hodName: "Ramesh Kumar",
    hodEmployeeId: "EMP102",
    reportingHierarchy: "Operations Head",
    location: "Hyderabad",
    email: "service@company.com",
    phone: "+91 9876543210",
    status: "Active",
  },
];

/* ---------------- COMPONENT ---------------- */

const DepartmentMaster = () => {
  const [departments, setDepartments] =
    useState<Department[]>(initialDepartments);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Department | null>(null);

  /* ---------------- ACTIONS ---------------- */

  const handleSave = () => {
    if (editing) {
      setDepartments((prev) =>
        prev.some((d) => d.id === editing.id)
          ? prev.map((d) => (d.id === editing.id ? editing : d))
          : [...prev, { ...editing, id: Date.now().toString() }]
      );
    }
    setOpen(false);
    setEditing(null);
  };

  const toggleStatus = (id: string) => {
    setDepartments((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: d.status === "Active" ? "Inactive" : "Active" }
          : d
      )
    );
  };

  /* ---------------- UI ---------------- */

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Department Master</CardTitle>
          <CardDescription>
            Manage departments and reporting structure
          </CardDescription>
        </div>
        <Button
          onClick={() => {
            setEditing({
              id: "",
              name: "",
              code: "",
              branch: "",
              hodName: "",
              hodEmployeeId: "",
              reportingHierarchy: "",
              location: "",
              email: "",
              phone: "",
              status: "Active",
            });
            setOpen(true);
          }}
          className="bg-accent"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Department
        </Button>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Department</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>HOD</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell>{d.code}</TableCell>
                  <TableCell>{d.branch}</TableCell>
                  <TableCell>{d.hodName}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        d.status === "Active"
                          ? "badge-success"
                          : "badge-destructive"
                      }
                    >
                      {d.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditing(d);
                        setOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleStatus(d.id)}
                    >
                      <Power className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* ---------------- ADD / EDIT DIALOG ---------------- */}

      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) setEditing(null); // ✅ FIX: reset form on close
        }}
      >
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {editing?.id ? "Edit Department" : "Add Department"}
            </DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-4 mt-4">
              <div>
                <Label>Department Name *</Label>
                <Input
                  value={editing.name}
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Department Code *</Label>
                  <Input
                    value={editing.code}
                    onChange={(e) =>
                      setEditing({ ...editing, code: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Branch *</Label>
                  <Select
                    value={editing.branch}
                    onValueChange={(v) =>
                      setEditing({ ...editing, branch: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((b) => (
                        <SelectItem key={b} value={b}>
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>HOD Name</Label>
                  <Input
                    value={editing.hodName}
                    onChange={(e) =>
                      setEditing({ ...editing, hodName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>HOD Employee ID</Label>
                  <Input
                    value={editing.hodEmployeeId}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        hodEmployeeId: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <Label>Reporting Hierarchy</Label>
                <Input
                  placeholder="e.g. Operations Head"
                  value={editing.reportingHierarchy}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      reportingHierarchy: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Department Location</Label>
                  <Input
                    value={editing.location}
                    onChange={(e) =>
                      setEditing({ ...editing, location: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Department Email</Label>
                  <Input
                    value={editing.email}
                    onChange={(e) =>
                      setEditing({ ...editing, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label>Department Phone</Label>
                <Input
                  value={editing.phone}
                  onChange={(e) =>
                    setEditing({ ...editing, phone: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Status</Label>
                <Select
                  value={editing.status}
                  onValueChange={(v) =>
                    setEditing({
                      ...editing,
                      status: v as "Active" | "Inactive",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-accent">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default DepartmentMaster;
