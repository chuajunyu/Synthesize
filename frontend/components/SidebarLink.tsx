import React from 'react';

interface SidebarLinkProps {
  href?: string;
  icon: React.ReactNode;
  text: string;
  setProject?: (id: string ) => void;
}

export default function SidebarLink({ href, icon, text, setProject }: SidebarLinkProps) {
  const handleSelectProject = (projectId: string) => {
    if (setProject) {
      setProject(text);
    }
  };
  
  return (
    <li className="w-full overflow-hidden">
      {href ? (
        <a
          href={href}
          className="w-full flex items-center justify-start rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
        >
          {icon}
          <span className="w-full ml-4 text-left">{text}</span>
        </a>
      ) : (
        <div className="w-full flex items-center justify-start rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
          {icon}
          <span
            className="w-full ml-4 text-left truncate"
            onClick={() => handleSelectProject(text)}
          >
            {text}
          </span>
        </div>
      )}
    </li>
  );
}
