import React from 'react';

interface SidebarLinkProps {
  href?: string;
  icon: React.ReactNode;
  text: string;
  id?: string;
  setProject?: (project: { id: string; name: string }) => void;
  onClick?: () => void;
}

export default function SidebarLink({ href, icon, text, id, setProject, onClick }: SidebarLinkProps) {
  const handleSelectProject = (projectId: string, projectTitle: string) => {
    if (setProject && onClick) {
      setProject({ id: projectId, name: projectTitle });
      onClick();
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
            onClick={() => id && handleSelectProject(id, text)}
          >
            {text}
          </span>
        </div>
      )}
    </li>
  );
}
