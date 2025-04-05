import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import './style.css';

export default function Home() {
  const Name = useSelector((state) => state.auth.Name);
  const UserID = useSelector((state) => state.auth.userID);
  const HousingSocietyCode = useSelector((state) => state.auth.HousingSocietyCode);

  const [housingSocietyName, setHousingSocietyName] = useState('');
  const [allCharges, setAllCharges] = useState([]);
  const [prevPayments, setPrevPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [societiesRes, chargesRes, paymentsRes] = await Promise.all([
          axios.get('http://localhost:3000/HousingSocieties'),
          axios.get('http://localhost:3000/Charges'),
          axios.get('http://localhost:3000/Payment'),
        ]);

        const society = societiesRes.data.find(
          (e) => e.HousingSocietyCode === HousingSocietyCode
        );
        if (society) {
          setHousingSocietyName(society.HousingSocietyName);
        }

        const charges = chargesRes.data.filter(
          (e) => e.HousingSocietyCode === HousingSocietyCode
        );
        if (charges.length) {
          setAllCharges(charges);
        }

        const payments = paymentsRes.data.filter((e) => e.UserID === Number(UserID));
        if (payments.length) {
          setPrevPayments(payments);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [HousingSocietyCode, UserID]);

  return (
    <>
      <h2>Welcome {Name}</h2>
      <p>Society: {housingSocietyName}</p> <div>
         <Link to="/Payment" className="btn btn-primary">Pay</Link>
      </div>
      <div style={{display:"flex", flex:"row"}}>
        <table>
          <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>type</th>
          </tr>
          </thead>
          <tbody>
          {allCharges.map((charge, index) => (
          <tr>
            <td>{charge.Description}</td>
            <td>{charge.Amount}</td>
            <td>{charge.Type}</td>
          </tr>
          ))}
          </tbody>

        </table>
        <table>
          <thead>
          <tr>
            <th>Month</th>
            <th>Year</th>
            <th>Transactin Details</th>
            <th>Transactin Date</th>
            <th>Paid Amount</th>
            <th>Mode</th>            
          </tr>
          </thead>

          <tbody>
          {prevPayments.map((payment, index) => (
          <tr>
            <td>{payment.Month}</td>
            <td>{payment.Year}</td>
            <td>{payment.TransactinDetails}</td>
            <td>{payment.TransactinDate}</td>
            <td>{payment.PaidAmount}</td>
            <td>{payment.TransactionType}</td>            
          </tr>
          ))}
          </tbody>   
        </table>
      </div>
    </>
  );
}
