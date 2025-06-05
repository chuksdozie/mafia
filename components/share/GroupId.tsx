// GroupId.tsx
import React, { useState, forwardRef } from "react";
import { MdOutlineContentCopy, MdOutlineFileDownload } from "react-icons/md";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

type Props = {
  id: string;
  ref: React.RefObject<HTMLElement | null>;
};

const GroupId = ({ id, ref }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleDownload = async () => {
    if (!ref.current) return;

    const element = ref.current;
    // element.querySelectorAll(".text-element").forEach((textEl) => {
    //   const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    //   const text = document.createElementNS(
    //     "http://www.w3.org/2000/svg",
    //     "text"
    //   );
    //   text.textContent = textEl.textContent;
    //   svg.appendChild(text);
    //   textEl.replaceWith(svg);
    // });

    // Freeze animations and transitions
    // const originalStyles = Array.from(document.querySelectorAll("*")).map(
    //   (el) => {
    //     const computed = window.getComputedStyle(el);
    //     return {
    //       element: el,
    //       transition: computed.transition,
    //       animation: computed.animation,
    //     };
    //   }
    // );

    // // Disable all animations
    // originalStyles.forEach(({ element }) => {
    //   (element as HTMLElement).style.transition = "none";
    //   (element as HTMLElement).style.animation = "none";
    // });
    const canvas = await html2canvas(element, {
      scale: 4, // High resolution rendering
      logging: false, // Disable console logging
      useCORS: true, // For external images
      allowTaint: true, // For external images
      backgroundColor: "#ffffff", // White background
    });
    const imgData = canvas.toDataURL("image/png");

    // Set your desired width (in mm)
    const contentWidth = 180;
    const ratio = canvas.width / canvas.height;
    const contentHeight = contentWidth / ratio;

    // Calculate centering position
    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
    });

    const x = (210 - contentWidth) / 2; // Center horizontally
    const y = (297 - contentHeight) / 2; // Center vertically

    pdf.addImage(imgData, "PNG", x, y, contentWidth, contentHeight);
    pdf.save("download.pdf");
  };

  // const handleDownload = async () => {
  //   try {
  //     if (ref && typeof ref !== "function" && ref.current) {
  //       const opt = {
  //         margin: 0.5,
  //         filename: `buddy-pay-${id}.pdf`,
  //         image: { type: "jpeg", quality: 0.98 },
  //         html2canvas: { scale: 2 },
  //         jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  //       };

  //       // await html2pdf().set(opt).from(ref.current).save();
  //       const el = ref?.current;
  //       if (el) {
  //         html2pdf().set(opt).from(el).save();
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Download failed:", error);
  //     // Show user-friendly error message
  //     alert("Failed to generate PDF. Please try again later.");
  //   }
  // };
  return (
    <div className="flex justify-center items-center gap-2 mb-4">
      <div
        className="flex items-center gap-2 border border-gray-300 rounded-full p-2 px-4 bg-gray-200 cursor-pointer m-0"
        onClick={handleCopy}
      >
        <span className="text-xs font-medium text-gray-700 ">
          Group ID: {id}
        </span>
        <MdOutlineContentCopy size={16} />
      </div>

      <div
        className="flex items-center gap-2 border border-gray-300 rounded-full p-2  bg-gray-200 cursor-pointer"
        onClick={handleDownload}
      >
        <MdOutlineFileDownload size={16} />
        {/* <span className="text-xs text-gray-700">Download PDF</span> */}
      </div>

      {copied && (
        <p className="text-green-600 text-xs absolute top-[50px] bg-white border px-3 py-1 rounded">
          Copied!
        </p>
      )}
    </div>
  );
};

// GroupId.displayName = "GroupId"; // Necessary for forwardRef
export default GroupId;
