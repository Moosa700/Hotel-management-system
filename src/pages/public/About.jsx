import {
  Award,
  Users,
  BedDouble,
  Star,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

export default function About() {
  const stats = [
    {
      number: "10+",
      label: "Years of Excellence",
    },
    {
      number: "120+",
      label: "Luxury Rooms",
    },
    {
      number: "25K+",
      label: "Happy Guests",
    },
    {
      number: "4.9★",
      label: "Guest Rating",
    },
  ];

  const values = [
    {
      icon: Award,
      title: "Luxury Experience",
      description:
        "Elegant rooms, premium facilities and unforgettable hospitality designed to exceed expectations.",
    },
    {
      icon: Users,
      title: "Professional Team",
      description:
        "Our highly trained staff delivers exceptional service with warmth, professionalism and care.",
    },
    {
      icon: ShieldCheck,
      title: "Safety First",
      description:
        "24/7 security, secure access, CCTV monitoring and complete peace of mind for every guest.",
    },
    {
      icon: HeartHandshake,
      title: "Guest Satisfaction",
      description:
        "Every decision we make focuses on creating memorable experiences for our visitors.",
    },
  ];

  return (
    <div>

      {/* ================= HERO ================= */}

      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(7,40,43,.65),rgba(7,40,43,.65)),url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070')",
        }}
      >

        <div className="container text-center text-white">

          <span className="hero-badge">
            LUXURY HOTEL EXPERIENCE
          </span>


          <h1 className="hero-title mt-8">
            Where Luxury
            <br />
            Meets <span>Comfort</span>
          </h1>


          <p className="hero-text mt-8">
            LuxuryStay creates unforgettable experiences through
            elegant accommodations, exceptional hospitality and
            world-class service.
          </p>


          <div className="flex justify-center gap-5 mt-10 flex-wrap">

            <button className="btn-primary">
              Book Your Stay
            </button>


            <button className="btn-secondary">
              Explore Rooms
            </button>

          </div>

        </div>

      </section>



      {/* ================= OUR STORY ================= */}

      <section className="py-24">

        <div className="container grid md:grid-cols-2 gap-14 items-center">


          <div>

            <img
              className="rounded-3xl shadow-xl"
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1974"
              alt="Luxury Hotel"
            />

          </div>



          <div>


            <span
              className="text-sm tracking-[.3em]"
              style={{
                color: "var(--secondary)",
              }}
            >
              OUR STORY
            </span>



            <h2 className="section-title text-left mt-5">
              Crafting Luxury Experiences Since 2015
            </h2>



            <p className="text-gray-600 leading-8 mb-5">
              LuxuryStay was founded with one vision —
              redefining hospitality through elegance,
              comfort and exceptional customer service.
            </p>



            <p className="text-gray-600 leading-8 mb-8">
              From beautifully designed rooms and fine dining
              to wellness facilities and personalized services,
              every detail is created for a world-class luxury
              experience.
            </p>



            <div className="card flex gap-5 items-start">


              <BedDouble
                size={55}
                style={{
                  color:"var(--secondary)",
                  flexShrink:0
                }}
              />


              <div>

                <h3 className="text-xl mb-3">
                  Premium Hospitality
                </h3>


                <p className="text-gray-600">
                  Luxury suites, gourmet dining,
                  spa treatments, fitness facilities,
                  swimming pools and personalized guest
                  services.
                </p>


              </div>


            </div>


          </div>


        </div>

      </section>

            {/* ================= STATISTICS ================= */}

      <section className="py-20 bg-[#0f3d3e]">

        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6">


          {stats.map((item) => (

            <div
              key={item.label}
              className="text-center p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20"
            >

              <h2
                className="text-5xl font-bold"
                style={{
                  color:"var(--secondary)"
                }}
              >
                {item.number}
              </h2>


              <p className="text-white mt-3">
                {item.label}
              </p>


            </div>

          ))}


        </div>

      </section>




      {/* ================= WHY CHOOSE US ================= */}


      <section className="py-24">


        <div className="container">


          <div className="text-center mb-14">


            <span
              className="tracking-[.3em] text-sm"
              style={{
                color:"var(--secondary)"
              }}
            >
              WHY CHOOSE US
            </span>



            <h2 className="section-title mt-5">
              Exceptional Hospitality,
              Every Step of the Way
            </h2>



            <p className="section-subtitle">
              We combine luxury, comfort and personalized
              service to ensure every guest enjoys an
              unforgettable experience.
            </p>


          </div>




          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">



            {values.map((value)=>{


              const Icon=value.icon;


              return (

                <div
                  key={value.title}
                  className="card text-center"
                >


                  <div
                    className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full"
                    style={{
                      background:"#f2d08d",
                      color:"#0f3d3e"
                    }}
                  >

                    <Icon size={40}/>

                  </div>




                  <h3 className="text-xl mb-4">
                    {value.title}
                  </h3>



                  <p className="text-gray-600 leading-7">
                    {value.description}
                  </p>



                </div>

              );


            })}


          </div>


        </div>


      </section>





      {/* ================= EXPERIENCE ================= */}


      <section
        className="py-24"
        style={{
          background:"#f7f7f5"
        }}
      >


        <div className="container grid md:grid-cols-2 gap-14 items-center">


          <div>


            <span
              className="tracking-[.3em] text-sm"
              style={{
                color:"var(--secondary)"
              }}
            >
              THE LUXURYSTAY EXPERIENCE
            </span>



            <h2 className="section-title text-left mt-5">
              Every Stay Is Designed
              To Feel Extraordinary
            </h2>




            <p className="text-gray-600 leading-8 mb-8">

              From the moment you arrive, every detail is
              carefully planned to provide comfort, elegance
              and exceptional hospitality.

            </p>




            <ul className="space-y-4 text-gray-700">


              <li>
                ✓ Spacious Luxury Suites
              </li>


              <li>
                ✓ Award-Winning Restaurant
              </li>


              <li>
                ✓ Rooftop Infinity Pool
              </li>


              <li>
                ✓ Spa & Wellness Center
              </li>


              <li>
                ✓ Airport Pickup Service
              </li>


              <li>
                ✓ 24/7 Concierge Support
              </li>


            </ul>


          </div>





          <div className="card text-center">


            <Star
              size={70}
              className="mx-auto mb-6"
              style={{
                color:"var(--secondary)"
              }}
            />



            <h3 className="text-2xl mb-5">
              Luxury You Can Trust
            </h3>



            <p className="text-gray-600 leading-8">

              Trusted by thousands of travelers worldwide,
              LuxuryStay continues to deliver exceptional
              experiences with world-class comfort.

            </p>


          </div>


        </div>


      </section>

            {/* ================= MISSION & VISION ================= */}

      <section className="py-24">

        <div className="container">


          <div className="text-center mb-14">


            <span
              className="tracking-[.3em] text-sm"
              style={{
                color:"var(--secondary)"
              }}
            >
              OUR PURPOSE
            </span>



            <h2 className="section-title mt-5">
              Inspired By Excellence
            </h2>



            <p className="section-subtitle">
              Our mission is to redefine luxury hospitality
              through innovation, personalized service and
              unforgettable guest experiences.
            </p>


          </div>




          <div className="grid md:grid-cols-2 gap-8">


            <div className="card text-center">


              <Star
                size={55}
                className="mx-auto mb-6"
                style={{
                  color:"var(--secondary)"
                }}
              />


              <h3 className="text-2xl mb-5">
                Our Mission
              </h3>



              <p className="text-gray-600 leading-8">

                To deliver exceptional hospitality by combining
                luxury, comfort and personalized services that
                exceed guest expectations and create unforgettable
                memories.

              </p>


            </div>





            <div className="card text-center">


              <Award
                size={55}
                className="mx-auto mb-6"
                style={{
                  color:"var(--secondary)"
                }}
              />



              <h3 className="text-2xl mb-5">
                Our Vision
              </h3>



              <p className="text-gray-600 leading-8">

                To become one of the world's most admired
                luxury hotel brands, recognized for excellence,
                innovation, sustainability and guest satisfaction.

              </p>


            </div>


          </div>


        </div>


      </section>





      {/* ================= CALL TO ACTION ================= */}


      <section
        className="py-24"
        style={{
          background:"#0f3d3e"
        }}
      >


        <div className="container">


          <div
            className="text-center rounded-3xl p-12 md:p-20"
            style={{
              background:
              "linear-gradient(rgba(15,61,62,.9),rgba(15,61,62,.9))"
            }}
          >


            <span className="hero-badge">
              EXPERIENCE TRUE LUXURY
            </span>




            <h2 className="hero-title mt-8">
              Your Perfect Stay
              <br />
              Starts Here
            </h2>




            <p className="hero-text mt-8">

              Whether you are planning a relaxing vacation,
              business trip or special celebration, LuxuryStay
              promises an unforgettable experience with
              elegant accommodations and world-class service.

            </p>




            <div className="flex justify-center gap-5 mt-10 flex-wrap">


              <button className="btn-primary">
                Book Your Stay
              </button>



              <button className="btn-secondary">
                View Our Rooms
              </button>


            </div>


          </div>


        </div>


      </section>



    </div>
  );
}