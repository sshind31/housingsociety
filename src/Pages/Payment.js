import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Payment(){
    const [allCharges, setAllCharges] = useState([]);
    const HousingSocietyCode = useSelector((state) => state.auth.HousingSocietyCode);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const chargesRes = await axios.get('http://localhost:3000/Charges')
            const charges = chargesRes.data.filter(
              (e) => e.HousingSocietyCode === HousingSocietyCode
            );
            if (charges.length) {
              setAllCharges(charges);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [HousingSocietyCode]);
    return(
    <>
    </>
    );
}