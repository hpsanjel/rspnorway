"use client";
import Image from "next/image";
import { FileText, Download, Calendar, Eye } from "lucide-react";
import { useState } from "react";
import { useLocale } from "next-intl";

interface Document {
	id: string;
	title: string;
	date: string;
	fileUrl: string;
	imageUrl?: string;
	category: string;
	downloadCount: number;
}

export default function DownloadDetailClient({ doc, otherDownloads }: { doc: Document; otherDownloads: Document[] }) {
	const [showPreview, setShowPreview] = useState(false);
	const locale = useLocale();

	// Improved PDF detection: checks for .pdf at end of fileUrl before ? or #, case-insensitive
	const isPdf = typeof doc.fileUrl === "string" && /\.pdf($|[?#])/i.test(doc.fileUrl);

	const handleDownload = async (fileUrl: string, title: string) => {
		let ext = ".pdf";
		const match = fileUrl.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
		if (match) ext = "." + match[1];
		const safeTitle = title.replace(/[\\/:*?"<>|\r\n]+/g, "_") + ext;
		const response = await fetch(fileUrl);
		const blob = await response.blob();
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = safeTitle;
		link.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div className="flex flex-col md:flex-row gap-8 p-4 md:p-8">
			{/* Main Detail */}
			<div className="flex-1 bg-white rounded-xl shadow-lg p-8">
				<div className="mb-6">
					{doc.imageUrl ? (
						<Image src={doc.imageUrl} alt={doc.title} width={400} height={300} className="rounded-lg object-contain max-h-80 w-full" />
					) : (
						<div className="w-full h-60 flex items-center justify-center bg-blue-50 rounded-lg">
							<FileText size={64} className="text-blue-200" />
						</div>
					)}
				</div>
				<h1 className="text-3xl font-bold mb-2">{doc.title}</h1>
				<div className="flex items-center text-gray-500 mb-4">
					<Calendar size={18} className="mr-2" /> {doc.date}
				</div>
				<div className="flex gap-4 mb-4">
					<button type="button" onClick={handleDownload.bind(null, doc.fileUrl, doc.title)} className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
						<Download size={20} /> Download
					</button>
					{isPdf && (
						<button type="button" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-brand rounded-lg font-semibold hover:bg-gray-300 transition-colors" onClick={() => setShowPreview((v) => !v)} aria-label={showPreview ? "Hide PDF preview" : "Show PDF preview"}>
							<Eye size={20} /> {showPreview ? "Hide Preview" : "Preview"}
						</button>
					)}
				</div>
				{showPreview && isPdf && (
					<div className="w-full h-[70vh] border rounded-lg overflow-hidden mb-4">
						<iframe src={doc.fileUrl} title="PDF Preview" className="w-full h-full" frameBorder={0} />
					</div>
				)}
			</div>
			{/* Sidebar */}
			<aside className="w-full md:w-80 flex-shrink-0">
				<h2 className="text-lg font-bold mb-4">Other Downloads</h2>
				<div className="space-y-4">
					{otherDownloads.map((item) => (
						<div key={item.id} className="block bg-white rounded-lg shadow p-4 hover:shadow-lg transition-all">
							<div className="flex items-center gap-3">
								{item.imageUrl ? (
									<Image src={item.imageUrl} alt={item.title} width={48} height={48} className="rounded object-cover w-12 h-12" />
								) : (
									<div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded">
										<FileText size={28} className="text-blue-200" />
									</div>
								)}
								<div className="flex-1 min-w-0">
									<a href={`/${locale}/downloads/${item.id}`} className="block min-w-0">
										<div className="font-semibold text-gray-900 truncate">{item.title}</div>
										<div className="text-xs text-gray-500 truncate">{item.date}</div>
									</a>
								</div>
								<button type="button" className="p-1 rounded hover:bg-blue-100 focus:outline-none" title="Download" onClick={() => handleDownload(item.fileUrl, item.title)}>
									<Download size={18} className="text-blue-400" />
								</button>
							</div>
						</div>
					))}
				</div>
			</aside>
		</div>
	);
}
