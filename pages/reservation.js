/**
FileName: Reservation.js
Description:
React component representing a reservation page for selecting and booking hotel rooms.
This component renders a reservation page where users can select their desired check-in and check-out dates.
It displays information about available rooms, their prices, and allows users to make reservations for the chosen dates.
The component uses Firebase functions to fetch available rooms and their prices from the database.
*/

import React from 'react';
import { useRouter } from 'next/router';
import ResRoom from '@/components/ResRoom';
import styles from '@/styles/reservation.module.css';
import { useState, useEffect } from 'react';
import { getAvailRoomsDB, getRoomPricesDB } from '@/firebase/firebaseUtils';


const Reservation = () => {
    const router = useRouter();
    const {checkInDate, checkOutDate} = router.query;
    const [availRooms, setAvailRooms] = useState({large: 0, medium: 0, small: 0})
    const [roomPrices, setRoomPrices] = useState({large: 0, medium: 0, small: 0})
    const [daysBooked, setDaysBooked] = useState(0)


    useEffect(() => {
        const updateRoomInfo = () => {
            // set dates
            getAvailRoomsDB(checkInDate, checkOutDate)
            .then((data) => {
                setAvailRooms(data)
            })

            // set prices
            getRoomPricesDB()
            .then((data) => {
                setRoomPrices(data)
            })
        }
        updateRoomInfo()

        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const diffDays = Math.round(Math.abs((new Date(checkOutDate) - new Date(checkInDate)) / oneDay));
        // console.log(diffDays)
        setDaysBooked(diffDays)

    }, [checkInDate, checkOutDate])


    return (
      <div>
        <div className={styles.gradient}>
          <div className={styles.background}>
              <div className={styles.reservationTitle}>
                <h1>Reservations</h1> {/* Move the "Reservations" heading into the background */}
              </div>
              <div className={styles.dateInfo}>
                <p className={styles.dates}>
                  You selected the following dates for your stay:
                  <br />
                  Check In: {checkInDate} <br /> Check Out: {checkOutDate}
                </p>
              </div>
          </div>
      
          <div className={styles.container}>
            <div className={styles.text}>
              <p>
                We&apos;re delighted to help you find the perfect room and making your
                stay at our hotel a delightful experience. Whether you&apos;re seeking a
                cozy nest for a solo adventure
                <br />
                or a spacious haven for a family getaway, we have just the right room
                waiting for you.
                <br />
                Take your time, explore our options, and imagine the tranquil ambiance
                and stunning views that await. Go ahead and find the room that speaks to
                your heart,
                <br />
                and let us create wonderful memories during your stay at Duck&apos;s Nest.
              </p>
            </div>
      
      
              <div className={styles.roomContainer}>
                
                <div className={styles.size}>
                    <h1>The Cozy | Singles</h1>
                    <img src="/img/cozy.jpg" alt="Logo" className={styles.img} />
                    <p>
                        Welcome to our cozy room, designed to provide a comfortable and
                        enjoyable stay for one or two guests. Relax in a cozy queen-sized
                        bed and appreciate the tasteful furnishings that create a soothing
                        atmosphere. The en-suite bathroom offers convenience with modern
                        amenities, including a rain shower and a deep soaking tub. Enjoy
                        the pleasant ambiance of this well-appointed room, where every
                        detail is thoughtfully arranged to ensure a memorable experience.
                    </p>
                    <p>Rooms Available: {availRooms.small}</p>
                    <p>Price: ${roomPrices.small * daysBooked}  ({daysBooked} nights at ${roomPrices.small} per night)</p>
                    {availRooms.small > 0 ? (
                        <ResRoom
                            size={"small"}
                            checkInDate={checkInDate}
                            checkOutDate={checkOutDate}
                            price={roomPrices.small * daysBooked}
                        />
                    ) : (
                        <p>Sorry, no rooms are available for these dates.</p>
                    )}
                </div>
      
                <div className={styles.size}>
                    <h1>Room Deluxe | Family </h1>
                    <img src="/img/deluxe.jpg" alt="Logo" className={styles.img} />
                    <p>
                        Discover the ultimate in comfort and sophistication within our
                        deluxe room, thoughtfully designed to accommodate up to four
                        guests. Step into a spacious sanctuary adorned with stylish
                        furnishings and contemporary touches, creating an atmosphere of
                        relaxation and indulgence. Sink into the plush beds and relish the
                        ample space available for your entire group to unwind and
                        rejuvenate. With its inviting ambiance and attention to detail,
                        this exquisite retreat promises a memorable stay where comfort and
                        elegance intertwine harmoniously.
                    </p>
                    <p>Rooms Available: {availRooms.medium}</p>
                    <p>Price: ${roomPrices.medium * daysBooked}  ({daysBooked} nights at ${roomPrices.medium} per night)</p>
                    {availRooms.medium > 0 ? (
                        <ResRoom
                            size={"medium"}
                            checkInDate={checkInDate}
                            checkOutDate={checkOutDate}
                            price={roomPrices.medium * daysBooked}
                        />
                    ) : (
                        <p>Sorry, no rooms are available for these dates.</p>
                    )}
                </div>
      
                <div className={styles.size}>
                    <h1>Luxury | Group</h1>
                    <img src="/img/luxury.jpg" alt="Logo" className={styles.img} />
                    <p>
                        Experience pure luxury in our exquisite room, where elegance meets
                        comfort. Enjoy a king-sized bed adorned with plush linens for a
                        restful sleep. The spacious en-suite bathroom features marble
                        accents and indulgent amenities. Immerse yourself in the opulent
                        ambiance of our luxury room and indulge in an unforgettable stay.
                    </p>
                    <p>Rooms Available: {availRooms.large}</p>
                    <p>Price: ${roomPrices.large * daysBooked}  ({daysBooked} nights at ${roomPrices.large} per night)</p>
                    {availRooms.large > 0 ? (
                        <ResRoom
                            size={"large"}
                            checkInDate={checkInDate}
                            checkOutDate={checkOutDate}
                            price={roomPrices.large * daysBooked}
                        />
                    ) : (
                        <p>Sorry, no rooms are available for these dates.</p>
                    )}
                </div>

              </div>
          </div>
        </div>
       </div> 
      );
    };
    
    export default Reservation;