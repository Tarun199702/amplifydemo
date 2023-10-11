import React, { useState,useEffect } from 'react';
import { API } from 'aws-amplify';

const initialFormData = {
  name: '',
  email: '',
};

function MyForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [items, setItems] = useState([]);

  useEffect(() => {
        // Fetch all items from the 'getname' DynamoDB table on component mount
        fetchItems();
      }, []);
    

  const fetchItems = async () => {
        try {
          const apiData = await API.get('getname', '/getname'); // Use the correct API endpoint name
          setItems(apiData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const deleteItem = async (email) => {
            try {
              const response = await fetch(`https://351w05x5e8.execute-api.us-east-1.amazonaws.com/dev/getname/object/${email}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
          
              if (response.ok) {
                // Item successfully deleted, refresh the list of items
                fetchItems();
              } else {
                // Handle error if deletion fails
                const errorData = await response.json();
                console.error('Error deleting item:', errorData);
              }
            } catch (error) {
              console.error('Error deleting item:', error);
            }
          };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post('getname', '/getname', {
        body: formData,
      });
      alert('Data submitted successfully!');
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateItem = async (email) => {
        try {
          await API.put('getname', `https://351w05x5e8.execute-api.us-east-1.amazonaws.com/dev/getname/${email}`, { body: formData }); // Use the correct API endpoint name
          setFormData(initialFormData);
        //   setEditingItem(null);
          fetchItems(); // Refresh the list of items after updating
        } catch (error) {
          console.error('Error updating item:', error);
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

    {items.map((data)=>{
        return <div>{data.email}{' '}{data.name}
        
        <button onClick={()=>deleteItem(data.email)}>delete</button>
        <button  onClick={()=>updateItem(data.email)}>update</button>
        </div>
    })}
    </>
  );
}

export default MyForm;
