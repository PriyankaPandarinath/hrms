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

interface Branch {
  id: string;
  branchName: string;
  branchCode: string;
  state: string;
  city: string;
  address: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  operationalSince: string;
  branchType: string;
  capacity: string;
  gstNumber: string;
  status: "Active" | "Inactive";
}

/* ---------------- MOCK DATA ---------------- */

const initialBranches: Branch[] = [
  {
    id: "1",
    branchName: "Hyderabad",
    branchCode: "HYD",
    state: "Telangana",
    city: "Hyderabad",
    address: "Madhapur, Hyderabad, Telangana",
    contactPerson: "Ravi Kumar",
    contactNumber: "+91 9876543210",
    email: "hyd@ssspl.com",
    operationalSince: "2015",
    branchType: "Head",
    capacity: "250",
    gstNumber: "36ABCDE1234F1Z5",
    status: "Active",
  },
];

/* ---------------- COMPONENT ---------------- */

const BranchMaster = () => {
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Branch | null>(null);

  const handleSave = () => {
    if (editing) {
      setBranches((prev) =>
        prev.map((b) => (b.id === editing.id ? editing : b))
      );
    } else {
      setBranches((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          branchName: "",
          branchCode: "",
          state: "",
          city: "",
          address: "",
          contactPerson: "",
          contactNumber: "",
          email: "",
          operationalSince: "",
          branchType: "",
          capacity: "",
          gstNumber: "",
          status: "Active",
        },
      ]);
    }
    setOpen(false);
    setEditing(null);
  };

  const toggleStatus = (id: string) => {
    setBranches((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: b.status === "Active" ? "Inactive" : "Active" }
          : b
      )
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Branch / Location Master</CardTitle>
          <CardDescription>
            Manage company branches and operational locations
          </CardDescription>
        </div>
        <Button onClick={() => setOpen(true)} className="bg-accent">
          <Plus className="h-4 w-4 mr-2" />
          Add Branch
        </Button>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Branch Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>State</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>GST</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {branches.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">
                    {b.branchName}
                  </TableCell>
                  <TableCell>{b.branchCode}</TableCell>
                  <TableCell>{b.state}</TableCell>
                  <TableCell>{b.city}</TableCell>
                  <TableCell>{b.branchType}</TableCell>
                  <TableCell>{b.gstNumber}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        b.status === "Active"
                          ? "badge-success"
                          : "badge-destructive"
                      }
                    >
                      {b.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditing(b);
                        setOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleStatus(b.id)}
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

      {/* ADD / EDIT DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Branch" : "Add Branch"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <Label>Branch Name *</Label>
              <Input
                value={editing?.branchName || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, branchName: e.target.value } : p
                  )
                }
              />
            </div>

            <div>
              <Label>Branch Code *</Label>
              <Input
                value={editing?.branchCode || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, branchCode: e.target.value } : p
                  )
                }
              />
            </div>

            <div>
              <Label>State *</Label>
              <Input
                value={editing?.state || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, state: e.target.value } : p
                  )
                }
              />
            </div>

            <div>
              <Label>City *</Label>
              <Input
                value={editing?.city || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, city: e.target.value } : p
                  )
                }
              />
            </div>

            <div className="col-span-2">
              <Label>Full Address *</Label>
              <Input
                value={editing?.address || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, address: e.target.value } : p
                  )
                }
              />
            </div>

            <div>
              <Label>Contact Person *</Label>
              <Input
                value={editing?.contactPerson || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, contactPerson: e.target.value } : p
                  )
                }
              />
            </div>

            <div>
              <Label>Contact Number *</Label>
              <Input
                value={editing?.contactNumber || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, contactNumber: e.target.value } : p
                  )
                }
              />
            </div>

            <div>
              <Label>Email ID *</Label>
              <Input
                value={editing?.email || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, email: e.target.value } : p
                  )
                }
              />
            </div>

            <div>
              <Label>Operational Since</Label>
              <Input
                value={editing?.operationalSince || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, operationalSince: e.target.value } : p
                  )
                }
              />
            </div>

            <div>
              <Label>Branch Type *</Label>
              <Select
                value={editing?.branchType || ""}
                onValueChange={(v) =>
                  setEditing((p) => (p ? { ...p, branchType: v } : p))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select branch type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Head">Head</SelectItem>
                  <SelectItem value="Regional">Regional</SelectItem>
                  <SelectItem value="Satellite">Satellite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Employee Capacity</Label>
              <Input
                value={editing?.capacity || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, capacity: e.target.value } : p
                  )
                }
              />
            </div>

            <div>
              <Label>GST Number *</Label>
              <Input
                value={editing?.gstNumber || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, gstNumber: e.target.value } : p
                  )
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={() =>{
              setEditing(null);
              setOpen(false)
            } }>
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

export default BranchMaster;
