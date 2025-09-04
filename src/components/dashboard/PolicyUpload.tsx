import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileType, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PolicyDocument {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: 'processing' | 'ready' | 'error';
}

export function PolicyUpload() {
  const [documents, setDocuments] = useState<PolicyDocument[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    setUploading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:8000/policy/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        
        const newDoc: PolicyDocument = {
          id: data.id || Math.random().toString(),
          name: file.name,
          type: file.type,
          uploadDate: new Date().toISOString(),
          status: 'processing'
        };

        setDocuments(prev => [...prev, newDoc]);

        // Simulate processing completion
        setTimeout(() => {
          setDocuments(prev =>
            prev.map(doc =>
              doc.id === newDoc.id ? { ...doc, status: 'ready' } : doc
            )
          );
        }, 2000);

      } catch (error) {
        console.error('Upload error:', error);
      }
    }

    setUploading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Policy Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Button asChild>
            <label className="cursor-pointer">
              Upload Policy Document
              <input
                type="file"
                className="hidden"
                multiple
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </label>
          </Button>
        </div>
        <ScrollArea className="h-[300px]">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 border-b"
            >
              <div>
                <div className="font-medium">{doc.name}</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(doc.uploadDate).toLocaleDateString()}
                </div>
              </div>
              {doc.status === 'processing' ? (
                <div className="text-yellow-500">Processing...</div>
              ) : doc.status === 'ready' ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <div className="text-red-500">Error</div>
              )}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
