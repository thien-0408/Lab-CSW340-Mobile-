import { v4 as uuidv4 } from 'uuid';

export const fetchContacts = async () => {
  const response = await fetch('https://randomuser.me/api/?results=50'); 
  const data = await response.json();
  
  // Chuẩn hóa dữ liệu trả về từ RandomUser API
  return data.results.map((user) => ({
    id: uuidv4(),
    name: `${user.name.first} ${user.name.last}`,
    avatar: user.picture.large,
    phone: user.phone,
    cell: user.cell,
    email: user.email,
    favorite: Math.random() < 0.2, // Random ngẫu nhiên một số item yêu thích
  }));
};