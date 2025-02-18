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

        const paymentId = "PAY123456"; // Simulated payment ID
        dispatch(bookSeats({ selectedSeats, showId, paymentId }));
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Select Seats</h2>
            <div className="grid grid-cols-5 gap-2">
                {seats.map((seat) => (
                    <button
                        key={seat.id}
                        className={`p-3 border rounded-lg ${selectedSeats.includes(seat.id)
                                ? "bg-blue-500"
                                : seat.isAvailable
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                            }`}
                        onClick={() => seat.isAvailable && toggleSeat(seat.id)}
                        disabled={!seat.isAvailable}
                    >
                        {seat.row}{seat.number}
                    </button>
                ))}
            </div>
            <button
                onClick={handleBooking}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "Booking..." : "Book Now"}
            </button>
            {success && <p className="text-green-500 mt-2">Booking Successful!</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default SeatSelection;
