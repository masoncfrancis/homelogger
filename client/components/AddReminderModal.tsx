import React, {useEffect, useState} from 'react';
import {Modal, Button, Form, Alert} from 'react-bootstrap';
import {SERVER_URL} from '@/pages/_app';

interface Props {
  show: boolean;
  handleClose: () => void;
}

interface Appliance {
  id: number;
  applianceName: string;
}

const areaOptions = [
  {value: '', label: 'None'},
  {value: 'yard', label: 'Yard'},
  {value: 'interior', label: 'Interior'},
  {value: 'water', label: 'Water/Plumbing'},
  {value: 'electrical', label: 'Electrical'},
  {value: 'hvac', label: 'HVAC'},
  {value: 'other', label: 'Other'},
];

const AddReminderModal: React.FC<Props> = ({show, handleClose}) => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [recurrenceRule, setRecurrenceRule] = useState('');
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [applianceId, setApplianceId] = useState<number | null>(null);
  const [area, setArea] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppliances = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/appliances`);
        const data = (await res.json()) as Appliance[];
        setAppliances(data || []);
      } catch (e) {
        console.error('Error fetching appliances', e);
      }
    };
    fetchAppliances();
  }, []);

  const submit = async () => {
    setError(null);
    if (!title) { setError('Title is required'); return; }
    const payload: { title: string; notes: string; recurrenceRule: string; area: string; applianceId?: number } = { title, notes, recurrenceRule, area };
    if (applianceId) payload.applianceId = applianceId;

    try {
      const res = await fetch(`${SERVER_URL}/tasks/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Server error');
      }
      // refresh to show new reminders/occurrences
      window.location.reload();
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message || 'Error creating reminder');
      else setError(String(e) || 'Error creating reminder');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Reminder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control value={title} onChange={e => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" rows={3} value={notes} onChange={e => setNotes(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Recurrence Rule (RRULE)</Form.Label>
            <Form.Control placeholder="e.g. FREQ=MONTHLY;INTERVAL=3" value={recurrenceRule} onChange={e => setRecurrenceRule(e.target.value)} />
            <Form.Text className="text-muted">Provide an RFC5545 RRULE body (no DTSTART).</Form.Text>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Appliance (optional)</Form.Label>
            <Form.Select value={applianceId ?? ''} onChange={e => setApplianceId(e.target.value ? Number(e.target.value) : null)}>
              <option value="">None</option>
              {appliances.map(a => <option key={a.id} value={a.id}>{a.applianceName}</option>)}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Area</Form.Label>
            <Form.Select value={area} onChange={e => setArea(e.target.value)}>
              {areaOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={submit}>Create Reminder</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddReminderModal;
