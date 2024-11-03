"use client";
import { DeleteDialog } from "@/components/adminDashBoard/delete-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Spline } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UpdateDocumentPayload } from "@/types/documents";
import { DeleteDocument, EditDocument } from "@/store/Slices/DocumentSlice";

export const DocumentDetailPageClient = () => {
  const param = useParams();
  const { documentId } = param;
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { documents, isLoading } = useAppSelector((state) => state.Documents);
  const document = documents.find((doc) => doc.id === documentId);
  const [editDocument, setEditDocument] = useState<UpdateDocumentPayload>({
    id: "",
    dname: "",
    dlink: "",
  });
  useEffect(() => {
    if (document) {
      setEditDocument(document);
    }
  }, [document]);
  const handleEditDocument = () => {
    if (!editDocument.dname || !editDocument.dlink) {
      return toast({ title: "Fill Out All Field", variant: "destructive" });
    }
    dispatch(
      EditDocument({
        ...editDocument,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminDashBoard/documents");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  const handleDeleteDocument = () => {
    dispatch(
      DeleteDocument({
        id: editDocument.id,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminDashBoard/documents");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <Card className="w-1/2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tigh">
            Edit Document Details
          </h3>
          <div className="">
            <DeleteDialog OnDelete={handleDeleteDocument} loading={isLoading} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <p>Document Name</p>
          <Input
            defaultValue={document?.dname}
            onChange={(e) => {
              setEditDocument({ ...editDocument, dname: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col gap-3">
          <p>Document Link</p>
          <Input
            defaultValue={document?.dlink}
            onChange={(e) => {
              setEditDocument({ ...editDocument, dlink: e.target.value });
            }}
          />
        </div>

        <div>
          <div className="flex justify-end">
            <Button
              className="bg-green-500 text-white mt-3 hover:bg-green-400"
              onClick={handleEditDocument}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spline className="h-4 w-4 animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
