import { NavLink } from "@solidjs/router";
import { cutePets } from "../stores/pet-store";

const HeaderComponent = () => {
  return (
    <header class="p-4 w-full max-w-80">
      <nav class="p-4 flex justify-center items-center space-x-4">
        <h2 class="text-decoration-none">
          <NavLink href="/">Home</NavLink>
        </h2>
        <small>
          <NavLink href="/likedpets">Liked Pets {cutePets()?.length}</NavLink>
        </small>
      </nav>
    </header>
  );
};

export default HeaderComponent;
