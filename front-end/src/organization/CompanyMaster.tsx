import { useState } from "react";
import { Plus, Edit, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

/* ---------------- TYPES ---------------- */

interface Company {
  id: string;
  companyName: string;
  companyCode: string;
  cinGst: string;
  panNumber: string;
  registeredAddress: string;
  corporateAddress: string;
  contactEmail: string;
  contactPhone: string;
  establishmentYear: string;
  industryType: string;
  website: string;
  brandName: string;
  status: "Active" | "Inactive";
}

/* ---------------- MOCK DATA ---------------- */

const initialCompanies: Company[] = [
  {
    id: "1",
    companyName: "Srinivasa Sales and Service Pvt. Ltd.",
    companyCode: "SSSPL",
    cinGst: "36ABCDE1234F1Z5",
    panNumber: "ABCDE1234F",
    registeredAddress: "Registered Office, Hyderabad, Telangana",
    corporateAddress: "Corporate Office, Hyderabad, Telangana",
    contactEmail: "info@ssspl.com",
    contactPhone: "+91 9876543210",
    establishmentYear: "2010",
    industryType: "Services",
    website: "https://www.ssspl.com",
    brandName: "SSSPL",
    status: "Active",
  },
];

/* ---------------- COMPONENT ---------------- */

const CompanyMaster = () => {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Company | null>(null);

  const handleSave = () => {
    if (editing) {
      setCompanies((prev) =>
        prev.map((c) => (c.id === editing.id ? editing : c))
      );
    } else {
      setCompanies((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          companyName: "",
          companyCode: "",
          cinGst: "",
          panNumber: "",
          registeredAddress: "",
          corporateAddress: "",
          contactEmail: "",
          contactPhone: "",
          establishmentYear: "",
          industryType: "",
          website: "",
          brandName: "",
          status: "Active",
        },
      ]);
    }
    setOpen(false);
    setEditing(null);
  };

  const toggleStatus = (id: string) => {
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" }
          : c
      )
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Company Master</CardTitle>
          <CardDescription>
            Define legal and operational company details
          </CardDescription>
        </div>
        <Button onClick={() => setOpen(true)} className="bg-accent">
          <Plus className="h-4 w-4 mr-2" />
          Add Company
        </Button>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Company Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>GST / CIN</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">
                    {c.companyName}
                  </TableCell>
                  <TableCell>{c.companyCode}</TableCell>
                  <TableCell>{c.cinGst}</TableCell>
                  <TableCell>{c.contactEmail}</TableCell>
                  <TableCell>{c.contactPhone}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        c.status === "Active"
                          ? "badge-success"
                          : "badge-destructive"
                      }
                    >
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditing(c);
                        setOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleStatus(c.id)}
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
              {editing ? "Edit Company" : "Add Company"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <Label>Company Name *</Label>
              <Input
                value={editing?.companyName || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, companyName: e.target.value } : p
                  )
                }
              />
            </div>

            <div>
              <Label>Company Code *</Label>
              <Input
                value={editing?.companyCode || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, companyCode: e.target.value } : p
                  )
                }
              />
            </div>

            <div>
              <Label>GST / CIN *</Label>
              <Input
                value={editing?.cinGst || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, cinGst: e.target.value } : p
                  )
                }
              />
            </div>

            <div>
              <Label>PAN Number *</Label>
              <Input
                value={editing?.panNumber || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, panNumber: e.target.value } : p
                  )
                }
              />
            </div>

            <div className="col-span-2">
              <Label>Registered Address *</Label>
              <Input
                value={editing?.registeredAddress || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, registeredAddress: e.target.value } : p
                  )
                }
              />
            </div>

            <div className="col-span-2">
              <Label>Corporate Address *</Label>
              <Input
                value={editing?.corporateAddress || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, corporateAddress: e.target.value } : p
                  )
                }
              />
            </div>

            <div>
              <Label>Contact Email *</Label>
              <Input
                value={editing?.contactEmail || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, contactEmail: e.target.value } : p
                  )
                }
              />
            </div>

            <div>
              <Label>Contact Phone *</Label>
              <Input
                value={editing?.contactPhone || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, contactPhone: e.target.value } : p
                  )
                }
              />
            </div>

            <div>
              <Label>Establishment Year</Label>
              <Input
                value={editing?.establishmentYear || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, establishmentYear: e.target.value } : p
                  )
                }
              />
            </div>

            <div>
              <Label>Industry Type</Label>
              <Select
                value={editing?.industryType || ""}
                onValueChange={(v) =>
                  setEditing((p) => (p ? { ...p, industryType: v } : p))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manufacturing">
                    Manufacturing
                  </SelectItem>
                  <SelectItem value="Services">Services</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Website URL</Label>
              <Input
                value={editing?.website || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, website: e.target.value } : p
                  )
                }
              />
            </div>

            <div>
              <Label>Brand Name / Logo Text</Label>
              <Input
                value={editing?.brandName || ""}
                onChange={(e) =>
                  setEditing((p) =>
                    p ? { ...p, brandName: e.target.value } : p
                  )
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={() => {
              setEditing(null);
              setOpen(false)
            }}>
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

export default CompanyMaster;
