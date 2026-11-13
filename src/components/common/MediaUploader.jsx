import React, { useRef, useState } from 'react';

/**
 * Drag-and-drop / click picker for listing photos or videos.
 * Enforces min/max counts, shows previews and a live counter.
 * Files stay in the browser (object URLs); upload happens server-side later.
 */
export default function MediaUploader({ kind, files, onChange, min, max }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [notice, setNotice] = useState('');
  const isPhoto = kind === 'photo';
  const accept = isPhoto ? 'image/*' : 'video/*';
  const noun = isPhoto ? 'photo' : 'video';

  // Files live in the parent form's state so they survive moving between
  // steps; preview URLs are released when an item is removed.

  const addFiles = (list) => {
    const incoming = Array.from(list).filter((f) => f.type.startsWith(isPhoto ? 'image/' : 'video/'));
    const room = max - files.length;
    if (room <= 0) {
      setNotice(`Maximum of ${max} ${noun}s reached.`);
      return;
    }
    const accepted = incoming.slice(0, room).map((file) => ({ file, url: URL.createObjectURL(file), id: `${file.name}-${file.size}-${Math.random()}` }));
    setNotice(incoming.length > room ? `Only ${room} more ${noun}${room === 1 ? '' : 's'} allowed (limit ${max}). Extra files were skipped.` : '');
    onChange([...files, ...accepted]);
  };

  const remove = (id) => {
    const target = files.find((f) => f.id === id);
    if (target) URL.revokeObjectURL(target.url);
    onChange(files.filter((f) => f.id !== id));
    setNotice('');
  };

  const count = files.length;
  const ok = count >= min && count <= max;

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
        className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center space-y-3 transition-colors ${
          dragOver ? 'border-[#3E4E31] bg-[#F4EDDA]/70' : 'border-[#BFA668]/60 bg-[#FBF8F2]'
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-[#F4EDDA] text-[#3E4E31] flex items-center justify-center mx-auto text-xl" aria-hidden="true">
          {isPhoto ? '📷' : '🎬'}
        </div>
        <h4 className="text-sm font-bold text-[#1A2315] font-editorial">
          {isPhoto ? 'Property Photos' : 'Property Videos'}
        </h4>
        <p className="text-xs text-[#3E4E31] font-medium">
          Drag and drop or select files. Minimum <strong>{min}</strong>, maximum <strong>{max}</strong> {noun}s.
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          className="sr-only"
          onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }}
          aria-label={`Select ${noun}s from device`}
        />
        <button type="button" onClick={() => inputRef.current?.click()} className="btn-luxury-outline px-4 py-2 rounded-xl text-xs font-bold">
          Select {isPhoto ? 'Photos' : 'Videos'} from Device
        </button>
        <p className={`text-[11px] font-bold ${ok ? 'text-[#3E4E31]' : 'text-[#9E8547]'}`} aria-live="polite">
          {count} / {max} {noun}s selected{count < min ? ` · ${min - count} more required` : ' ✓'}
        </p>
        {notice && <p className="text-[11px] font-bold text-red-700" role="alert">{notice}</p>}
      </div>

      {count > 0 && (
        <ul className={`grid gap-2 ${isPhoto ? 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8' : 'grid-cols-2 sm:grid-cols-3'}`}>
          {files.map((f, i) => (
            <li key={f.id} className="relative group rounded-lg overflow-hidden border border-[#3E4E31]/15 bg-[#EDE6D6] aspect-square">
              {isPhoto ? (
                <img src={f.url} alt={`Selected photo ${i + 1}`} className="w-full h-full object-cover" />
              ) : (
                <video src={f.url} className="w-full h-full object-cover" muted preload="metadata" />
              )}
              {isPhoto && i === 0 && (
                <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-[#1F2A17]/85 text-white text-[9px] font-bold">Cover</span>
              )}
              <button
                type="button"
                onClick={() => remove(f.id)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/95 text-[#1A2315] text-xs font-bold shadow cursor-pointer"
                aria-label={`Remove ${noun} ${i + 1}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
