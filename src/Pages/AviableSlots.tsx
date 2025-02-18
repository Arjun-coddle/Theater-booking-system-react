import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAvailableSlots } from "../Store/SoltSlice";
import { AppDispatch, RootState } from "../Store/Store";

const AvailableSlots: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { seats, loading, error } = useSelector((state: RootState) => state.slots);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchAvailableSlots(parseInt(movieId)));
    }
  }, [movieId, dispatch]);

  if (loading) return <p>Loading available slots...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2>Available Slots</h2>
      <div>
        {seats?.map((seat) => (
          <div key={seat.id}>
            {seat.row}{seat.seat_number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableSlots;
