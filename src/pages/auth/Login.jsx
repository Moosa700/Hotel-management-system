import { useNavigate } from "@tanstack/react-router";

import PublicLayout from "@/layouts/PublicLayout";
import LoginForm from "@/components/forms/LoginForm";
import { useAuth } from "@/hooks/useAuth";


export default function Login() {

  const navigate = useNavigate();
  const { loginUser } = useAuth();



  const handleLogin = async (values) => {
    const res = await loginUser(values);
    const role = res?.user?.role || res?.data?.role;


      switch(role){

        case "admin":

          navigate({
            to:"/dashboard/admin",
          });

          break;


        case "staff":

          navigate({
            to:"/dashboard/staff",
          });

          break;



        default:

          navigate({
            to:"/dashboard/user",
          });

    }
  };




  return (

    <PublicLayout>


      <section
        className="min-h-screen flex items-center justify-center bg-cover bg-center py-20"
        style={{
          backgroundImage:
          "linear-gradient(rgba(7,40,43,.75),rgba(7,40,43,.75)),url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070')",
        }}
      >



        <div
          className="w-full max-w-md rounded-3xl p-10 shadow-2xl backdrop-blur-xl"
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
              Welcome Back
            </h1>



            <p className="text-gray-600 mt-3">
              Login to manage your luxury stay experience
            </p>


          </div>





          <LoginForm
            onSubmit={handleLogin}
          />



        </div>



      </section>


    </PublicLayout>

  );

}