import { useState, useRef } from 'react';

import { useDrag, useDrop } from 'react-dnd';
import { Checkbox, Button, FormControlLabel, Box, Typography, IconButton } from '@mui/material';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

interface Column {
  header: string;
  name: string;
}

interface CheckboxItem {
  header: string;
  active: boolean;
}

interface CheckboxListFormProps {
  columns: Column[];
  onSubmit: (selectedItems: CheckboxItem[]) => void;
  onClose: () => void;
}

interface DragItem {
  index: number;
  header: string;
  type: string;
}

const CheckboxListForm: React.FC<CheckboxListFormProps> = ({ columns, onSubmit, onClose }) => {
  const [checkboxes, setCheckboxes] = useState<CheckboxItem[]>(
    columns.map((item) => ({
      header: item.header,
      active: false,
    }))
  );

  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const handleCheckboxChange = (index: number) => {
    const newCheckboxes = [...checkboxes];

    newCheckboxes[index].active = !newCheckboxes[index].active;
    setCheckboxes(newCheckboxes);

    const selectedHeaders = newCheckboxes.filter((item) => item.active).map((item) => item.header);

    setSelectedChips(selectedHeaders);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(checkboxes);
  };

  const handleChipDelete = (header: string) => {
    const newCheckboxes = [...checkboxes];
    const index = newCheckboxes.findIndex((item) => item.header === header);

    if (index !== -1) {
      newCheckboxes[index].active = false;
      setCheckboxes(newCheckboxes);
      setSelectedChips(selectedChips.filter((chip) => chip !== header));
    }
  };

  const moveChip = (dragIndex: number, hoverIndex: number) => {
    const draggedChip = selectedChips[dragIndex];
    const updatedChips = [...selectedChips];

    updatedChips.splice(dragIndex, 1);
    updatedChips.splice(hoverIndex, 0, draggedChip);
    setSelectedChips(updatedChips);
  };

  const Chip: React.FC<{ header: string; index: number }> = ({ header, index }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
      accept: 'chip',
      hover(item: DragItem) {
        if (!ref.current) {
          return;
        }

        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        moveChip(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    const [{ isDragging }, drag] = useDrag({
      type: 'chip',
      item: { header, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    drag(drop(ref));

    return (
      <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: 1,
            borderRadius: '4px',
            padding: '8px',
            marginBottom: '8px',
          }}
        >
          <div>
            <IconButton>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='1.3em'
                height='1.3em'
                viewBox='0 0 256 256'
                className='cursor-grab w-5 h-5'
              >
                <path
                  fill='currentColor'
                  d='M108 60a16 16 0 1 1-16-16a16 16 0 0 1 16 16m56 16a16 16 0 1 0-16-16a16 16 0 0 0 16 16m-72 36a16 16 0 1 0 16 16a16 16 0 0 0-16-16m72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16m-72 68a16 16 0 1 0 16 16a16 16 0 0 0-16-16m72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16'
                />
              </svg>
            </IconButton>
            {header}
          </div>
          <i
            className='ri-close-circle-fill w-4 h-4 cursor-pointer m-3'
            onClick={() => handleChipDelete(header)}
          ></i>
        </Box>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <form onSubmit={handleSubmit} className='px-4'>
        <div className='grid grid-cols-12 gap-2 pb-2'>
          <div className='col-span-7 overflow-y-auto border rounded p-2'>
            <Typography variant='h6'>All Columns</Typography>
            {checkboxes.map((item, index) => (
              <span key={index} className='rounded border border-gray-100 px-2 py-1.5 mx-0.5 my-1'>
                <FormControlLabel
                  control={<Checkbox checked={item.active} onChange={() => handleCheckboxChange(index)} />}
                  label={item.header}
                />
              </span>
            ))}
          </div>
          <div className='col-span-5'>
            <Typography variant='h6'>Reorder columns</Typography>
            <Typography variant='body2'>Click and drag to reorder the columns</Typography>
            <Box
              sx={{
                padding: '4px',
                paddingBottom: '12px',
                paddingTop: '12px',
                minHeight: '62px',
              }}
            >
              {selectedChips.map((header, index) => (
                <Chip key={header} header={header} index={index} />
              ))}
            </Box>
          </div>
        </div>
        <div className='flex justify-start gap-2'>
          <Button variant='outlined' color='inherit' type='button' onClick={onClose} sx={{ mt: 2, mb: 2 }}>
            Cancel
          </Button>
          <Button variant='contained' type='submit' sx={{ mt: 2, mb: 2 }}>
            Submit
          </Button>
        </div>
      </form>
    </DndProvider>
  );
};

export default CheckboxListForm;
