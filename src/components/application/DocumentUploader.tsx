'use client';

import { useCallback, useState } from 'react';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';
import { formatFileSize } from '@/lib/format';

interface UploadedFile {
  file: File;
  preview?: string;
}

interface Props {
  label: string;
  accept?: string;
  maxSizeMB?: number;
  multiple?: boolean;
  files: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
}

export default function DocumentUploader({ label, accept = '.pdf,.jpg,.jpeg,.png', maxSizeMB = 25, multiple = false, files, onChange }: Props) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback((fileList: FileList) => {
    setError(null);
    const newFiles: UploadedFile[] = [];

    Array.from(fileList).forEach((file) => {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`${file.name} exceeds ${maxSizeMB}MB limit`);
        return;
      }

      const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined;
      newFiles.push({ file, preview });
    });

    if (multiple) {
      onChange([...files, ...newFiles]);
    } else {
      onChange(newFiles.slice(0, 1));
    }
  }, [files, maxSizeMB, multiple, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const removeFile = (index: number) => {
    const updated = [...files];
    if (updated[index].preview) URL.revokeObjectURL(updated[index].preview!);
    updated.splice(index, 1);
    onChange(updated);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="w-4 h-4 text-accent-blue" />;
    return <FileText className="w-4 h-4 text-accent-amber" />;
  };

  return (
    <div>
      <label className="block text-sm font-medium text-text-secondary mb-1.5">{label}</label>

      {/* Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
          dragActive ? 'border-navy bg-navy/5' : 'border-border hover:border-navy/30 hover:bg-surface-secondary'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById(`upload-${label}`)?.click()}
      >
        <input
          id={`upload-${label}`}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        <Upload className="w-8 h-8 text-text-tertiary mx-auto mb-2" />
        <p className="text-sm text-text-secondary">
          <span className="font-medium text-navy">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-text-tertiary mt-1">
          {accept.replace(/\./g, '').toUpperCase().replace(/,/g, ', ')} up to {maxSizeMB}MB
        </p>
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-accent-red mt-2">{error}</p>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-surface-secondary rounded-lg p-3 border border-border">
              {getFileIcon(f.file.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{f.file.name}</p>
                <p className="text-xs text-text-tertiary">{formatFileSize(f.file.size)}</p>
              </div>
              <button type="button" onClick={() => removeFile(i)} className="text-text-tertiary hover:text-accent-red transition-colors p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
