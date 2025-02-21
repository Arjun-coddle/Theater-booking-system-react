import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookSeats } from "../Store/BookingSlice";
import { AppDispatch, RootState } from "../Store/Store";

interface Seat {
    id: number;
    row: string;
    number: number;
    isAvailable: boolean;
}

interface Props {
    seats: Seat[];
    showId: number;
}

const SeatSelection: React.FC<Props> = ({ seats, showId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, success, error } = useSelector((state: RootState) => state.booking);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

    const toggleSeat = (seatId: number) => {
        setSelectedSeats((prev) =>
            prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
        );
    };

    const handleBooking = () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat.");
            return;
        }

        const paymentId = "PAY123456"; 
        dispatch(bookSeats({ selectedSeats, showId, paymentId }));
    };

    return (
        <div>
            <h2>Select Seats</h2>
            <div">
                {seats.map((seat) => (
                    <button
                        key={seat.id}
                        onClick={() => seat.isAvailable && toggleSeat(seat.id)}
                        disabled={!seat.isAvailable}
                    >
                        {seat.row}{seat.number}
                    </button>
                ))}
            </div>
            <button
                onClick={handleBooking}
                disabled={loading}
            >
                {loading ? "Booking..." : "Book Now"}
            </button>
            {success && <p>Booking Successful!</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default SeatSelection;
