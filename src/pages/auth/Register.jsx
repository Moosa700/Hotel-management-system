import { useNavigate } from "@tanstack/react-router";

import PublicLayout from "@/layouts/PublicLayout";
import RegisterForm from "@/components/forms/RegisterForm";
import { useAuth } from "@/hooks/useAuth";


export default function Register() {

  const navigate = useNavigate();
  const { registerUser } = useAuth();



  const handleRegister = async (values) => {
    await registerUser(values);
    navigate({ to: "/dashboard/user" });
  };




  return (

    <PublicLayout>


      <section
        className="min-h-screen flex items-center justify-center bg-cover bg-center py-20"
        style={{
          backgroundImage:
          "linear-gradient(rgba(7,40,43,.75),rgba(7,40,43,.75)),url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070')",
        }}
      >



        <div
          className="w-full max-w-lg rounded-3xl p-10 shadow-2xl backdrop-blur-xl"
          style={{
            background:"rgba(255,255,255,.95)"
          }}
        >




          <div className="text-center mb-8">


            <span
              className="text-sm tracking-[.3em]"
              style={{
                color:"var(--secondary)"
              }}
            >
              LUXURYSTAY
            </span>




            <h1 className="text-4xl mt-4">
              Create Account
            </h1>




            <p className="text-gray-600 mt-3">
              Join LuxuryStay and experience premium hospitality
            </p>



          </div>






          <RegisterForm
            onSubmit={handleRegister}
          />




        </div>



      </section>


    </PublicLayout>

  );

}