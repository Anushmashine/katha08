<<<<<<< HEAD
import React from 'react';
import { Calendar, Clock, Video, MapPin, User } from 'lucide-react';

const UpcomingSessions = ({ preview = false }) => {
  const sessions = [
    {
      id: 1,
      title: "Life Coaching Session",
      coach: "Dr. Emily Chen",
      date: "2025-01-15",
      time: "10:00 AM",
      duration: "60 min",
      type: "video",
      status: "confirmed",
      meetingLink: "https://zoom.us/j/123456789"
    },
    {
      id: 2,
      title: "Career Development Session", 
      coach: "Michael Rodriguez",
      date: "2025-01-17",
      time: "2:00 PM", 
      duration: "45 min",
      type: "in-person",
      status: "pending",
      location: "Downtown Office"
    },
    {
      id: 3,
      title: "Wellness Coaching",
      coach: "Sarah Williams",
      date: "2025-01-20",
      time: "9:00 AM",
      duration: "60 min", 
      type: "video",
      status: "confirmed",
      meetingLink: "https://meet.google.com/abc-defg-hij"
    }
  ];

  const displaySessions = preview ? sessions.slice(0, 2) : sessions;

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
=======
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, MapPin, User, Tag } from 'lucide-react';
// FIX: Using the correct, modern export name for client sessions
import { getMyClientSessions } from '@/auth/authApi'; 
import { toast } from 'sonner';

const UpcomingSessions = ({ preview = false }) => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // FIX: Calling the correct function
        const response = await getMyClientSessions(); 
        
        const sessionsData = response.data
            // Map to a consistent display format, focusing only on Session data
            .map(b => ({
                id: b.id,
                title: b.Session?.title || 'Session Booking',
                // Coach details come from Session -> CoachProfile -> User
                coachName: b.Session?.coachProfile?.user ? `${b.Session.coachProfile.user.firstName} ${b.Session.coachProfile.user.lastName}` : 'Unknown Coach',
                date: b.Session?.defaultDate,
                time: b.Session?.defaultTime,
                duration: b.Session?.duration || 'N/A', 
                type: b.Session?.type || 'individual',
                status: b.status,
                meetingLink: b.Session?.meetingLink,
            }))
            .filter(item => item.date); // Filter out items with no discernible date

        // Sort by date/time
        const sortedBookings = sessionsData.sort((a, b) => new Date(a.date) - new Date(b.date));

        setBookings(preview ? sortedBookings.slice(0, 3) : sortedBookings); 

      } catch (err) {
        console.error("Failed to fetch client sessions:", err);
        setError("Could not load your upcoming sessions.");
        toast.error("Failed to load your upcoming sessions.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [preview]); 

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
    }
  };

  const getTypeIcon = (type) => {
<<<<<<< HEAD
    return type === 'video' ? Video : MapPin;
  };

  return (
    <div className="space-y-4">
      {displaySessions.map((session) => {
        const TypeIcon = getTypeIcon(session.type);
        
        return (
          <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-gray-900">{session.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(session.status)}`}>
                    {session.status}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span>{session.coach}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{new Date(session.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>{session.time} ({session.duration})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TypeIcon size={16} />
                    <span>{session.type === 'video' ? 'Video Call' : session.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                {session.status === 'confirmed' && session.meetingLink && (
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                    Join Session
                  </button>
                )}
                <button className="border border-gray-300 text-gray-600 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors">
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        );
      })}
=======
    return (type === 'video' || type === 'remote') ? Video : MapPin;
  };

  if (isLoading) return <div className="text-center p-8"><p>Loading your sessions...</p></div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      {bookings.length > 0 ? (
        bookings.map((session) => {
          const TypeIcon = getTypeIcon(session.type);
          
          return (
            <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-gray-900">{session.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      Session
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <User size={16} />
                      <span>{session.coachName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>{new Date(session.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} />
                      <span>{session.time} ({session.duration})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TypeIcon size={16} />
                      <span>{session.type}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  {session.status === 'confirmed' && session.meetingLink && (
                    <a href={session.meetingLink} target="_blank" rel="noopener noreferrer"
                       className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors text-center">
                      Join Session
                    </a>
                  )}
                  <button className="border border-gray-300 text-gray-600 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
          <div className="text-center py-8">
            <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
            <h4 className="text-lg font-medium text-gray-800">No Upcoming Sessions</h4>
            <p className="text-gray-500">Book a new session or explore coaches to get started.</p>
          </div>
      )}
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8

      {!preview && (
        <div className="text-center pt-4">
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            View All Sessions
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingSessions;