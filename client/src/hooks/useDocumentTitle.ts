import { useEffect } from "react";

const BASE_TITLE = "A-Team Repair Solutions";

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE_TITLE}` : `${BASE_TITLE} | Professional Installation & Repair — Philadelphia Metro`;
  }, [title]);
}
