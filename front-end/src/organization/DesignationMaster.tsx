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
import { Textarea } from "@/components/ui/textarea";

/* ---------------- TYPES ---------------- */

interface Designation {
  id: string;
  name: string;
  level: string;
  levelCode: string;
  department: string;
  reportingTo: string;
  employmentType: string;
  minQualification: string;
  payScale: string;
  positions: number;
  jobDescription: string;
  status: "Active" | "Inactive";
}

/* ---------------- MOCK DATA ---------------- */

const departments = ["Service", "Sales", "Accounts", "HR"];
const levels = ["L1", "L2", "L3", "M1", "M2"];
const employmentTypes = ["Full-time", "Part-time", "Contract"];

const initialDesignations: Designation[] = [
  {
    id: "1",
    name: "Senior Technician",
    level: "L2",
    levelCode: "TECH-L2",
    department: "Service",
    reportingTo: "Service Manager",
    employmentType: "Full-time",
    minQualification: "Diploma",
    payScale: "₹25,000 - ₹35,000",
    positions: 10,
    jobDescription: "Handles field service and repairs",
    status: "Active",
  },
];

/* ---------------- COMPONENT ---------------- */

const DesignationMaster = () => {
  const [designations, setDesignations] =
    useState<Designation[]>(initialDesignations);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Designation | null>(null);

  const emptyForm: Designation = {
    id: "",
    name: "",
    level: "",
    levelCode: "",
    department: "",
    reportingTo: "",
    employmentType: "",
    minQualification: "",
    payScale: "",
    positions: 0,
    jobDescription: "",
    status: "Active",
  };

  const [form, setForm] = useState<Designation>(emptyForm);

  /* ---------------- HANDLERS ---------------- */

  const handleOpenAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const handleOpenEdit = (d: Designation) => {
    setEditing(d);
    setForm(d);
    setOpen(true);
  };

  const handleSave = () => {
    if (editing) {
      setDesignations((prev) =>
        prev.map((d) => (d.id === editing.id ? form : d))
      );
    } else {
      setDesignations((prev) => [
        ...prev,
        { ...form, id: Date.now().toString() },
      ]);
    }

    setOpen(false);
    setEditing(null);
    setForm(emptyForm);
  };

  const toggleStatus = (id: string) => {
    setDesignations((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status: d.status === "Active" ? "Inactive" : "Active",
            }
          : d
      )
    );
  };

  /* ---------------- UI ---------------- */

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Designation Master</CardTitle>
          <CardDescription>
            Define roles, hierarchy and responsibilities
          </CardDescription>
        </div>
        <Button onClick={handleOpenAdd} className="bg-accent">
          <Plus className="h-4 w-4 mr-2" />
          Add Designation
        </Button>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Designation</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Reports To</TableHead>
                <TableHead>Positions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {designations.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell>{d.level}</TableCell>
                  <TableCell>{d.department}</TableCell>
                  <TableCell>{d.reportingTo}</TableCell>
                  <TableCell>{d.positions}</TableCell>
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
                      onClick={() => handleOpenEdit(d)}
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

      {/* Add / Edit Dialog */}
      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) {
            setEditing(null);
            setForm(emptyForm);
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Designation" : "Add Designation"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <Label>Designation Name *</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Level / Grade *</Label>
              <Select
                value={form.level}
                onValueChange={(v) => setForm({ ...form, level: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Level Code *</Label>
              <Input
                value={form.levelCode}
                onChange={(e) =>
                  setForm({ ...form, levelCode: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Department *</Label>
              <Select
                value={form.department}
                onValueChange={(v) =>
                  setForm({ ...form, department: v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Reporting To *</Label>
              <Input
                value={form.reportingTo}
                onChange={(e) =>
                  setForm({ ...form, reportingTo: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Employment Type *</Label>
              <Select
                value={form.employmentType}
                onValueChange={(v) =>
                  setForm({ ...form, employmentType: v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {employmentTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Minimum Qualification</Label>
              <Input
                value={form.minQualification}
                onChange={(e) =>
                  setForm({ ...form, minQualification: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Pay Scale</Label>
              <Input
                value={form.payScale}
                onChange={(e) =>
                  setForm({ ...form, payScale: e.target.value })
                }
              />
            </div>

            <div>
              <Label>No. of Positions</Label>
              <Input
                type="number"
                value={form.positions}
                onChange={(e) =>
                  setForm({
                    ...form,
                    positions: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="col-span-2">
              <Label>Job Description</Label>
              <Textarea
                rows={3}
                value={form.jobDescription}
                onChange={(e) =>
                  setForm({ ...form, jobDescription: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setEditing(null);
                setForm(emptyForm);
              }}
            >
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

export default DesignationMaster;
