import ProjectsList from '@/components/layout/ProjectsList/ProjectsList.tsx';
import { useProjects } from '@/hooks/projects/useProjects.ts';

const HomePage = () => {
  const { projects, loading, error } = useProjects();

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <ProjectsList projects={projects} />
    </>
  );
};

export default HomePage;
