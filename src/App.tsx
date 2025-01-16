import React, { useState } from 'react';
import {
  Heart,
  Dumbbell,
  Tangent,
  Timer,
  ChevronLeft,
  Star,
  StarOff,
  CalendarDays,
  Weight,
  Repeat,
  Flame,
  Clock
} from 'lucide-react';

type WorkoutType = 'cardio' | 'strength' | 'flexibility' | 'endurance' | null;

interface Exercise {
  name: string;
  image: string;
  sets: number;
  reps: number;
  weight: string;
  rest: string;
  duration?: string;
}

interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

const getStrengthPlan = (level: number): WorkoutDay[] => {
  // Adjust difficulty based on level
  const getWeight = (base: number) => {
    const multiplier = level === 0 ? 0.5 : 1 + (level * 0.5);
    return `${Math.round(base * multiplier)}${level === 0 ? ' (or bodyweight)' : 'lbs'}`;
  };

  const getReps = (base: number) => {
    if (level === 0) return 10;
    if (level < 3) return 12;
    return Math.max(6, base - (level * 2));
  };

  return [
    {
      day: "Monday",
      focus: "Chest and Triceps",
      exercises: [
        {
          name: "Bench Press",
          image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=2070",
          sets: 4,
          reps: getReps(12),
          weight: getWeight(45),
          rest: "90 sec"
        },
        {
          name: "Incline Dumbbell Press",
          image: "https://images.unsplash.com/photo-1598632640487-6ea4a4e8b963?auto=format&fit=crop&q=80&w=2069",
          sets: 3,
          reps: getReps(10),
          weight: getWeight(30),
          rest: "60 sec"
        }
      ]
    },
    {
      day: "Tuesday",
      focus: "Back and Biceps",
      exercises: [
        {
          name: "Deadlifts",
          image: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?auto=format&fit=crop&q=80&w=2071",
          sets: 4,
          reps: getReps(8),
          weight: getWeight(95),
          rest: "120 sec"
        },
        {
          name: "Barbell Rows",
          image: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&q=80&w=2070",
          sets: 3,
          reps: getReps(12),
          weight: getWeight(65),
          rest: "90 sec"
        }
      ]
    },
    {
      day: "Wednesday",
      focus: "Legs",
      exercises: [
        {
          name: "Squats",
          image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2070",
          sets: 4,
          reps: getReps(10),
          weight: getWeight(85),
          rest: "120 sec"
        },
        {
          name: "Leg Press",
          image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=2070",
          sets: 3,
          reps: getReps(12),
          weight: getWeight(140),
          rest: "90 sec"
        }
      ]
    },
    {
      day: "Thursday",
      focus: "Shoulders",
      exercises: [
        {
          name: "Military Press",
          image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=2069",
          sets: 4,
          reps: getReps(10),
          weight: getWeight(45),
          rest: "90 sec"
        },
        {
          name: "Lateral Raises",
          image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=2070",
          sets: 3,
          reps: getReps(15),
          weight: getWeight(15),
          rest: "60 sec"
        }
      ]
    },
    {
      day: "Friday",
      focus: "Full Body Power",
      exercises: [
        {
          name: "Power Cleans",
          image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80&w=2070",
          sets: 5,
          reps: getReps(5),
          weight: getWeight(65),
          rest: "120 sec"
        },
        {
          name: "Push Press",
          image: "https://images.unsplash.com/photo-1586205208101-b9da5ef6120d?auto=format&fit=crop&q=80&w=2069",
          sets: 4,
          reps: getReps(8),
          weight: getWeight(55),
          rest: "90 sec"
        }
      ]
    },
    {
      day: "Saturday",
      focus: "Accessory Work",
      exercises: [
        {
          name: "Dumbbell Complex",
          image: "https://images.unsplash.com/photo-1583454152670-3638e647bb5d?auto=format&fit=crop&q=80&w=2070",
          sets: 3,
          reps: getReps(10),
          weight: getWeight(25),
          rest: "60 sec"
        },
        {
          name: "Core Circuit",
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=2070",
          sets: 3,
          reps: getReps(15),
          weight: "Bodyweight",
          rest: "45 sec"
        }
      ]
    },
    {
      day: "Sunday",
      focus: "Rest and Recovery",
      exercises: [
        {
          name: "Light Stretching",
          image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=2070",
          sets: 1,
          reps: 1,
          weight: "N/A",
          rest: "N/A"
        }
      ]
    }
  ];
};

const getCardioPlan = (level: number): WorkoutDay[] => {
  // Adjust difficulty based on level
  const getIntensity = (base: number) => {
    return Math.min(95, Math.round(base + (level * 5))); // Increase intensity with level
  };

  const getDuration = (base: number) => {
    const multiplier = level === 0 ? 0.7 : 1 + (level * 0.2);
    return Math.round(base * multiplier);
  };

  return [
    {
      day: "Monday",
      focus: "High-Intensity Intervals",
      exercises: [
        {
          name: "Treadmill Sprints",
          image: "https://images.unsplash.com/photo-1595058628627-b0bd9ea52c23?auto=format&fit=crop&q=80&w=2070",
          sets: 8,
          reps: 1,
          weight: `${getIntensity(70)}% max effort - 30 sec sprint / 90 sec walk`,
          rest: "90 sec"
        },
        {
          name: "Jump Rope Intervals",
          image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&q=80&w=2069",
          sets: 4,
          reps: 1,
          weight: `${getDuration(3)} minutes continuous`,
          rest: "60 sec"
        }
      ]
    },
    {
      day: "Tuesday",
      focus: "Endurance Building",
      exercises: [
        {
          name: "Steady State Running",
          image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=2070",
          sets: 1,
          reps: 1,
          weight: `${getDuration(30)} minutes at ${getIntensity(65)}% max heart rate`,
          rest: "N/A"
        },
        {
          name: "Stair Climber",
          image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&q=80&w=2031",
          sets: 1,
          reps: 1,
          weight: `${getDuration(15)} minutes at ${getIntensity(70)}% max heart rate`,
          rest: "N/A"
        }
      ]
    },
    {
      day: "Wednesday",
      focus: "Cross Training",
      exercises: [
        {
          name: "Rowing Intervals",
          image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&q=80&w=2031",
          sets: 6,
          reps: 1,
          weight: `${getDuration(4)} minutes at ${getIntensity(75)}% effort`,
          rest: "2 min"
        },
        {
          name: "Cycling",
          image: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&q=80&w=2072",
          sets: 1,
          reps: 1,
          weight: `${getDuration(20)} minutes at ${getIntensity(70)}% max heart rate`,
          rest: "N/A"
        }
      ]
    },
    {
      day: "Thursday",
      focus: "Speed Work",
      exercises: [
        {
          name: "Track Intervals",
          image: "https://images.unsplash.com/photo-1533681018184-68bd1d883b97?auto=format&fit=crop&q=80&w=2070",
          sets: 6,
          reps: 1,
          weight: `400m at ${getIntensity(85)}% effort`,
          rest: "2 min"
        },
        {
          name: "Agility Drills",
          image: "https://images.unsplash.com/photo-1520941356584-6c337e35c8c5?auto=format&fit=crop&q=80&w=2070",
          sets: 4,
          reps: 1,
          weight: `${getDuration(5)} minutes ladder drills`,
          rest: "90 sec"
        }
      ]
    },
    {
      day: "Friday",
      focus: "Mixed Cardio",
      exercises: [
        {
          name: "Swimming",
          image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=2070",
          sets: 1,
          reps: 1,
          weight: `${getDuration(20)} minutes freestyle`,
          rest: "N/A"
        },
        {
          name: "Elliptical",
          image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=2070",
          sets: 1,
          reps: 1,
          weight: `${getDuration(15)} minutes at ${getIntensity(75)}% max heart rate`,
          rest: "N/A"
        }
      ]
    },
    {
      day: "Saturday",
      focus: "Endurance Challenge",
      exercises: [
        {
          name: "Long Distance Run",
          image: "https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&q=80&w=2572",
          sets: 1,
          reps: 1,
          weight: `${getDuration(45)} minutes at ${getIntensity(65)}% max heart rate`,
          rest: "N/A"
        },
        {
          name: "Cool Down Walk",
          image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=2070",
          sets: 1,
          reps: 1,
          weight: "15 minutes easy pace",
          rest: "N/A"
        }
      ]
    },
    {
      day: "Sunday",
      focus: "Active Recovery",
      exercises: [
        {
          name: "Light Walking",
          image: "https://images.unsplash.com/photo-1538905386057-4a5a580c45a3?auto=format&fit=crop&q=80&w=2070",
          sets: 1,
          reps: 1,
          weight: `${getDuration(30)} minutes leisure walk`,
          rest: "N/A"
        }
      ]
    }
  ];
};

const getFlexibilityPlan = (level: number): WorkoutDay[] => {
  // Adjust difficulty based on level
  const getIntensity = (base: number) => {
    return Math.min(95, Math.round(base + (level * 5))); // Increase intensity with level
  };

  const getDuration = (base: number) => {
    const multiplier = level === 0 ? 0.7 : 1 + (level * 0.2);
    return Math.round(base * multiplier);
  };

  return [
    { 
      day: 'Monday', 
      focus: 'Flexibility', 
      exercises: [
        { 
          name: 'Hamstring Stretch', 
          image: 'https://images.unsplash.com/photo-1701826510609-b8d07deca0d4?auto=format&fit=crop&q=80&w=2070', 
          sets: 2, 
          reps: 1, 
          weight: `${getDuration(2)} mins`,
          rest: 'N/A' 
        }
      ] 
    },
    { 
      day: 'Tuesday', 
      focus: 'Flexibility', 
      exercises: [
        { 
          name: 'Quad Stretch', 
          image: 'https://images.unsplash.com/photo-1543971987-c328df79964d?auto=format&fit=crop&q=80&w=2070', 
          sets: 2,
          reps: 1, 
          weight: `${getDuration(2)} mins`, 
          rest: 'N/A'
        }
      ] 
    },
    { 
      day: 'Wednesday', 
      focus: 'Flexibility', 
      exercises: [
        { 
          name: 'Shoulder Stretch', 
          image: 'https://images.unsplash.com/photo-1607914660217-754fdd90041d?auto=format&fit=crop&q=80&w=2070', 
          sets: 2, 
          reps: 1, 
          weight: `${getDuration(2)} mins`,
          rest: 'N/A'
        }
      ] 
    },
    { 
      day: 'Thursday', 
      focus: 'Flexibility', 
      exercises: [
        { 
          name: 'Hamstring Stretch', 
          image: 'https://images.unsplash.com/photo-1701826510609-b8d07deca0d4?auto=format&fit=crop&q=80&w=2070', 
          sets: 2, 
          reps: 1, 
          weight: `${getDuration(2)} mins`,
          rest: 'N/A'
        }
      ] 
    },
    { 
      day: 'Friday', 
      focus: 'Flexibility', 
      exercises: [
        { 
          name: 'Quad Stretch', 
          image: 'https://images.unsplash.com/photo-1543971987-c328df79964d?auto=format&fit=crop&q=80&w=2070', 
          sets: 2, 
          reps: 1, 
          weight: `${getDuration(2)} mins`,
          rest: 'N/A'
        }
      ] 
    },
    { 
      day: 'Saturday', 
      focus: 'Flexibility', 
      exercises: [
        { 
          name: 'Shoulder Stretch', 
          image: 'https://images.unsplash.com/photo-1607914660217-754fdd90041d?auto=format&fit=crop&q=80&w=2070', 
          sets: 2, 
          reps: 1, 
          weight: `${getDuration(2)} mins`,
          rest: 'N/A'
        }
      ] 
    },
    { 
      day: 'Sunday', 
      focus: 'Rest', 
      exercises: 
      [
        { 
          name: 'Rest', 
          image: 'https://images.unsplash.com/photo-1482861989355-efedb79967d9?auto=format&fit=crop&q=80&w=2070', 
          sets: 1, 
          reps: 1, 
          weight: 'N/A', 
          rest: 'N/A' 
        }
      ] 
    },
  ];
};

const workoutPlans = [
  {
    type: 'cardio',
    title: 'Cardio Training',
    description: 'Boost your heart health and burn calories',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=2574'
  },
  {
    type: 'strength',
    title: 'Strength Training',
    description: 'Build muscle and increase power',
    icon: Dumbbell,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=2570'
  },
  {
    type: 'flexibility',
    title: 'Flexibility',
    description: 'Improve mobility and reduce injury risk',
    icon: Tangent,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2594'
  },
  {
    type: 'endurance',
    title: 'Endurance Training',
    description: 'Enhance stamina and mental toughness',
    icon: Timer,
    image: 'https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&q=80&w=2572'
  }
];

export default function App() {
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutType>(null);
  const [level, setLevel] = useState<number | null>(null);

  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, index) => (
      index < count ?
        <Star key={index} className="w-8 h-8 text-yellow-400 cursor-pointer" onClick={() => setLevel(index + 1)} /> :
        <StarOff key={index} className="w-8 h-8 text-gray-300 cursor-pointer" onClick={() => setLevel(index + 1)} />
    ));
  };

  if (selectedWorkout && level === null) {
    const selected = workoutPlans.find(plan => plan.type === selectedWorkout);
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto p-8">
          <button
            onClick={() => setSelectedWorkout(null)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Plans
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div
              className="h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${selected?.image})` }}
            />
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4">{selected?.title}</h2>
              <p className="text-gray-600 mb-8">{selected?.description}</p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Select Your Level:</h3>
                <div className="flex space-x-2">
                  {renderStars(0)}
                </div>
                <p className="text-sm text-gray-500">
                  0 = Just Starting • 5 = Extreme
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedWorkout === 'cardio' && level !== null) {
    const workoutPlan = getCardioPlan(level);

    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setLevel(null)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Level Selection
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Your 7-Day Cardio Plan</h2>
              <div className="flex items-center space-x-2">
                <p className="text-lg">Level: {level}</p>
                <div className="flex">
                  {renderStars(level)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workoutPlan.map((day, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    <CalendarDays className="w-5 h-5 text-blue-500 mr-2" />
                    <h3 className="text-xl font-semibold">{day.day}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{day.focus}</p>

                  {day.exercises.map((exercise, exIndex) => (
                    <div key={exIndex} className="mb-4 last:mb-0">
                      <div className="aspect-video rounded-lg overflow-hidden mb-3">
                        <img
                          src={exercise.image}
                          alt={exercise.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-semibold mb-2">{exercise.name}</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Flame className="w-4 h-4 mr-1 text-red-500" />
                          <span>{exercise.weight}</span>
                        </div>
                        {exercise.rest !== "N/A" && (
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1 text-gray-500" />
                            <span>Rest: {exercise.rest}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedWorkout === 'strength' && level !== null) {
    const workoutPlan = getStrengthPlan(level);

    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setLevel(null)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Level Selection
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Your 7-Day Strength Plan</h2>
              <div className="flex items-center space-x-2">
                <p className="text-lg">Level: {level}</p>
                <div className="flex">
                  {renderStars(level)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workoutPlan.map((day, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    <CalendarDays className="w-5 h-5 text-blue-500 mr-2" />
                    <h3 className="text-xl font-semibold">{day.day}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{day.focus}</p>

                  {day.exercises.map((exercise, exIndex) => (
                    <div key={exIndex} className="mb-4 last:mb-0">
                      <div className="aspect-video rounded-lg overflow-hidden mb-3">
                        <img
                          src={exercise.image}
                          alt={exercise.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-semibold mb-2">{exercise.name}</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Repeat className="w-4 h-4 mr-1 text-gray-500" />
                          <span>{exercise.sets} sets × {exercise.reps} reps</span>
                        </div>
                        <div className="flex items-center">
                          <Weight className="w-4 h-4 mr-1 text-gray-500" />
                          <span>{exercise.weight}</span>
                        </div>
                        <div className="col-span-2 text-gray-500">
                          Rest: {exercise.rest}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedWorkout === 'flexibility' && level !== null) {
    const workoutPlan = getFlexibilityPlan(level);

    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setLevel(null)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Level Selection
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Your 7-Day Cardio Plan</h2>
              <div className="flex items-center space-x-2">
                <p className="text-lg">Level: {level}</p>
                <div className="flex">
                  {renderStars(level)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workoutPlan.map((day, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    <CalendarDays className="w-5 h-5 text-blue-500 mr-2" />
                    <h3 className="text-xl font-semibold">{day.day}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{day.focus}</p>

                  {day.exercises.map((exercise, exIndex) => (
                    <div key={exIndex} className="mb-4 last:mb-0">
                      <div className="aspect-video rounded-lg overflow-hidden mb-3">
                        <img
                          src={exercise.image}
                          alt={exercise.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-semibold mb-2">{exercise.name}</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Flame className="w-4 h-4 mr-1 text-red-500" />
                          <span>{exercise.weight}</span>
                        </div>
                        {exercise.rest !== "N/A" && (
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1 text-gray-500" />
                            <span>Rest: {exercise.rest}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedWorkout && level !== null) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setLevel(null)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Level Selection
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-4">Your Personalized Plan</h2>
            <div className="flex items-center space-x-2 mb-4">
              <p className="text-lg">Level: {level}</p>
              <div className="flex">
                {renderStars(level)}
              </div>
            </div>
            <p className="text-gray-600">
              Your personalized {selectedWorkout} training plan has been created based on your level {level} selection.
              {level === 0 && " Perfect for beginners! We'll start with the basics."}
              {level === 5 && " Get ready for an extreme challenge!"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Choose Your Fitness Journey</h1>
          <p className="text-xl text-gray-600">Select a workout plan to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workoutPlans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.type}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => setSelectedWorkout(plan.type as WorkoutType)}
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${plan.image})` }}
                />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Icon className="w-6 h-6 text-blue-500 mr-3" />
                    <h3 className="text-xl font-semibold">{plan.title}</h3>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}