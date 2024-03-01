import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setShowResume } from "../../store/slices/ui";

export interface IResumeViewProps {
  resume: string;
  showResume: boolean;
}

export default function ResumeView(props: IResumeViewProps) {
  const { resume, showResume } = props;
  const dispatch = useDispatch();
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resumeRef && !resumeRef.current?.contains(e.currentTarget as Node)) {
        document.body.style.overflow = "auto";
        dispatch(setShowResume(false));
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [resumeRef]);

  if (showResume)
    return (
      <div className="fixed z-50 flex items-center justify-center  inset-0">
        <div className="">
          {" "}
          <iframe src={resume} height="800px" width="400px"></iframe>
        </div>
      </div>
    );
  return null;
}
