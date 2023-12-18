import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';

interface FormData {
  name: string;
  email: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
};

function MyForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [items, setItems] = useState<any[]>([]); 
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const apiData = await API.get('getname', '/getname', {});
      setItems(apiData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteItem = async (email: string) => {
    try {
      await API.del('getname', `/getname/object/${email}`, {});
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await API.post('getname', '/getname', {
        body: formData,
      });
      alert('Data submitted successfully!');
      setFormData(initialFormData);
      fetchItems();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendMessage = (email: string) => {
    const message = window.prompt('Enter your message:');
    if (message) {

      const emailData = {
        "recepients": [
          {
            'email':email
          }
        ],
        "subject": "Test email 2",
        "useTemplate": true,
        "templateId": "d-dda21ce0ab94402e8de3714c49c45b7b",
        "templateData": {
            'message': message
        },
        "message": "",
        "linkUrl": "https://media.istockphoto.com/id/1154370446/photo/funny-raccoon-in-green-sunglasses-showing-a-rock-gesture-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=kkZiaB9Q-GbY5gjf6WWURzEpLzNrpjZp_tn09GB21bI=",
        "linkText": "this is a link"
    }
      console.log(`Sending message to ${email}: ${message}`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      {items.map((data) => (
        <div key={data.email}>
          {data.email} {data.name}
          <button onClick={() => deleteItem(data.email)}>Delete</button>
          <button onClick={() => sendMessage(data.email)}>Send Message</button>
        </div>
      ))}
    </>
  );
}

export default MyForm;
