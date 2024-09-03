import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  DndContext,
  useSensor,
  MouseSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import EditFlashcard from "./EditFlashcard";
import mapOrder from "~/utils/sort";

function EditListFlashcard({ flashcards, flashcardOrderIds }) {
  const [orderedFlashcards, setOrderedFlashcards] = useState([]);
  const [activeDragFlashcard, setActiveDragFlashcard] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  useEffect(() => {
    if (flashcards.length > 0) {
      const newOrderedFlashcards = mapOrder(
        flashcards,
        flashcardOrderIds,
        "_id"
      );
      setOrderedFlashcards(newOrderedFlashcards);
    }
  }, [flashcards, flashcardOrderIds]);

  const onDragStart = (event) => {
    const { active } = event;
    setActiveDragFlashcard(active?.data?.current);
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) {
      return;
    }

    // check if the dragged item is different from the dropped item
    if (active.id === over.id) {
      return;
    }

    const oldIndex = orderedFlashcards.findIndex(
      (flashcard) => flashcard._id === active.id
    );

    const newIndex = orderedFlashcards.findIndex(
      (flashcard) => flashcard._id === over.id
    );

    const newOrderedFlashcards = arrayMove(
      orderedFlashcards,
      oldIndex,
      newIndex
    );

    setOrderedFlashcards(newOrderedFlashcards);

    // set null to active drag flashcard
    setActiveDragFlashcard(null);
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: 0.5 } },
    }),
  };

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sensors={sensors}
    >
      <SortableContext
        items={orderedFlashcards
          .map((flashcard) => flashcard._id)
          .filter((id) => id !== undefined)}
        strategy={verticalListSortingStrategy}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          {orderedFlashcards.map((flashcard) => (
            <EditFlashcard
              key={flashcard._id}
              flashcard={flashcard}
              id={
                orderedFlashcards.findIndex(
                  (item) => item._id === flashcard._id
                ) + 1
              }
            />
          ))}
        </Box>
      </SortableContext>
      <DragOverlay dropAnimation={dropAnimation}>
        {activeDragFlashcard ? (
          <EditFlashcard flashcard={activeDragFlashcard} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default EditListFlashcard;
