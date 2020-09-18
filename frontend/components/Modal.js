import Link from "next/link";
import FormInput from "./FormInput";

export default function Modal(props) {
  if(props.page === 'register') {
    return (
      <div>
        <div>
          <h1>SIGN UP</h1>
          <p>Already have an account?</p>
          <Link href='/login'>Sign In</Link>
        </div>
        <form>
          <FormInput title='Name' type='text' />
          <FormInput title='Email' type='text' />
          <FormInput title='Phone Number' type='text' />
          <FormInput title='Password' type='password' />
          <input type='submit' value='SIGN UP' />
        </form>
      </div>
    );
  }
  else if(props.page === 'login') {
    <div>
        <div>
          <h1>SIGN IN</h1>
          <p>Don't have an account?</p>
          <Link href='/login'>Sign Up</Link>
        </div>
        <form>
          <FormInput title='Email' type='text' />
          <FormInput title='Password' type='password' />
          <input type='submit' value='SIGN UP' />
        </form>
      </div>
  }
}