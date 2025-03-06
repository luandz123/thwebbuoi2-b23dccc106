import React, { useState } from 'react';
import { Button, Input, Card, Typography, List } from 'antd';

const { Title, Text } = Typography;

const GuessNumberGame: React.FC = () => {
  const [randomNumber, setRandomNumber] = useState(() => Math.floor(Math.random() * 100) + 1);//Lưu số ngẫu nhiên từ 1 đến 100
  const [guess, setGuess] = useState('');//Lưu số người chơi nhập vào
  const [message, setMessage] = useState('');//Hiển thị thông báo phản hồi (đoán cao/thấp/đúng)
  const [attempts, setAttempts] = useState(0);//Đếm số lần đoán (tối đa 10 lần)
  const [history, setHistory] = useState<number[]>([]);//Lưu danh sách các số đã đoán

  const handleGuess = () => {
    const numGuess = parseInt(guess, 10);
    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setMessage('⚠️ Vui lòng nhập số từ 1 đến 100!');
      return;
    }

    setAttempts(attempts + 1);
    setHistory([...history, numGuess]);

    if (numGuess < randomNumber) {
      setMessage('⬇️ Bạn đoán quá thấp!');
    } else if (numGuess > randomNumber) {
      setMessage('⬆️ Bạn đoán quá cao!');
    } else {
      setMessage('🎉 Chính xác! Bạn đã thắng!');
      return;
    }

    if (attempts + 1 >= 10 && numGuess !== randomNumber) {
      setMessage(`❌ Hết lượt! Số đúng là ${randomNumber}.`);
    }
  };

  const handleReset = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('');
    setAttempts(0);
    setHistory([]);
  };

  return (
    <Card style={{ width: 450, margin: '20px auto', textAlign: 'center', padding: '20px' }}>
      <Title level={3}>🎯 Trò chơi đoán số</Title>
      <Text strong>Bạn có 10 lượt để đoán số từ 1 đến 100!</Text>
      <br /><br />
      <Input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Nhập số của bạn"
        disabled={attempts >= 10}
      />
      <br /><br />
      <Button type="primary" onClick={handleGuess} disabled={attempts >= 10}>
        Đoán
      </Button>
      <Button onClick={handleReset} style={{ marginLeft: 10 }}>
        Chơi lại
      </Button>
      <br /><br />
      <Text>{message}</Text>
      <br /><br />
      <List
        bordered
        size="small"
        dataSource={history}
        renderItem={(item, index) => (
          <List.Item>
            <Text>Lần {index + 1}: {item}</Text>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default GuessNumberGame;
