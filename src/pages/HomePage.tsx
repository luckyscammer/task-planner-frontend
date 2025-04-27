import ProjectsList from '@/components/cards/ProjectsList/ProjectsList';
import { useProjects } from '@/hooks/projects/useProjects';

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
