import { Modal, Center, Button, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import useStreak from '../hooks/useStreak';
import { GameStatus } from '../types';

interface EndModalProps {
  opened: boolean;
  gameStatus: GameStatus;
  solution: string;
}

const EndModal = ({ gameStatus, opened, solution }: EndModalProps) => {
  const [modalOpened, setModalOpened] = useState(opened);
  const streak = useStreak();

  useEffect(() => {
    setModalOpened(opened);
  }, [opened]);

  return (
    <Modal
      title={
        <Text size="xl" weight="bold">
          {gameStatus === 'won' ? 'YOU WON' : 'YOU LOST'}
        </Text>
      }
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      withCloseButton={true}
      overlayOpacity={0.5}
      overlayBlur={2.5}
    >
      <Text sx={{ letterSpacing: 0.15 }}>
        Solution: {solution} <br /> Current streak: {streak.streak}
      </Text>
      <Center>
        <Button
          onClick={() => window.location.reload()}
          color="green"
          mt={'xl'}
        >
          Play again
        </Button>
      </Center>
    </Modal>
  );
};

export default EndModal;
