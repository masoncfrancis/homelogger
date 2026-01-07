import React, {useEffect, useState} from 'react';
import {ListGroup, Button, Spinner} from 'react-bootstrap';
import {SERVER_URL} from '@/pages/_app';

interface Task {
  id: number;
  title: string;
}

interface Occurrence {
  id: number;
  taskId: number;
  dueAt: string;
  status: string;
}

const NextUp: React.FC = () => {
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const [tasks, setTasks] = useState<Record<number, Task>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const now = new Date();
        const end = new Date();
        end.setDate(end.getDate() + 30);
        const startStr = now.toISOString();
        const endStr = end.toISOString();

        const [ocRes, tRes] = await Promise.all([
          fetch(`${SERVER_URL}/occurrences?start=${encodeURIComponent(startStr)}&end=${encodeURIComponent(endStr)}`),
          fetch(`${SERVER_URL}/tasks`),
        ]);
        const occJson = await ocRes.json();
        const tasksJson = await tRes.json();

        const taskMap: Record<number, Task> = {};
        const tasksArr = (tasksJson || []) as Task[];
        tasksArr.forEach((t) => { if (t && typeof t.id === 'number') taskMap[t.id] = t; });

        setTasks(taskMap);
        setOccurrences((occJson || []) as Occurrence[]);
      } catch (e) {
        console.error('Error loading occurrences:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const markComplete = async (id: number) => {
    try {
      const res = await fetch(`${SERVER_URL}/occurrences/${id}/complete`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed');
      const updated = await res.json();
      setOccurrences(prev => prev.map(o => o.id === updated.id ? updated : o));
    } catch (e) {
      console.error('Error marking complete', e);
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <div>
      <h4>Next Up (30 days)</h4>
      <ListGroup>
        {occurrences.length === 0 && <ListGroup.Item>No upcoming occurrences</ListGroup.Item>}
        {occurrences.map(o => (
          <ListGroup.Item key={o.id} className="d-flex justify-content-between align-items-center">
            <div>
              <div style={{fontWeight: 600}}>{tasks[o.taskId]?.title || `Task ${o.taskId}`}</div>
              <div style={{fontSize: 12, color: '#666'}}>{new Date(o.dueAt).toLocaleString()}</div>
            </div>
            <div>
              <span style={{marginRight: '0.5rem'}}>{o.status}</span>
              {o.status !== 'completed' && (
                <Button size="sm" onClick={() => markComplete(o.id)}>Complete</Button>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default NextUp;
