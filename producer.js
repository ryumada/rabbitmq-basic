const amqp = require('amqplib');

const init = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queue = 'ryumada';
  const message =
    'Hello Rabbitmq, I will start to learn you by now till then I died later.';

  // ini untuk memastikan apakah queue dengan nama 'ryumada' telah dibuat
  await channel.assertQueue(queue, {
    durable: true,
  });

  await channel.sendToQueue(queue, Buffer.from(message));
  console.log('Pesan berhasil terkirim?!');

  /**
   *  set timeout selama minimal 1 detik setelah pengiriman queue,
   * lalu tutup koneksi
   */
  setTimeout(() => {
    connection.close();
  }, 1000);
};

init();
