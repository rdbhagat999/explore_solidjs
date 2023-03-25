import { likePet, unLikePet, petIsCute } from "../stores/pet-store";

const PetCardComponent = (props) => {
  return (
    <div class="border border-slate-200 rounded">
      <div class="p-4 bg-slate-100">
        Pet Name is {props?.pet?.name} a {props?.pet?.animal}
      </div>
      <div class="card-body p-4 space-y-4">
        <p>
          {props?.pet?.city}, {props?.pet?.state}
        </p>
        <p class="card-text">{props?.pet?.description}</p>
      </div>

      <div class="p-4 bg-slate-100">
        {petIsCute(props?.pet?.id) ? (
          <button
            class="px-6 py-2 bg-red-500 text-white rounded-md"
            onclick={() => unLikePet(props?.pet?.id)}>
            UnLike
          </button>
        ) : (
          <button
            class="px-6 py-2 bg-blue-500 text-white rounded-md"
            onclick={() => likePet(props?.pet)}>
            Like
          </button>
        )}
      </div>
    </div>
  );
};

export default PetCardComponent;
