import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  dbTables,
  upcomingEventCollectionRef,
  buddyPayCollectionRef,
} from "@/constants/firebaseCollectionRefs";
import { TPayGroup } from "@/types/buddyPay.types";

export const useGetAllUpcomingEvents = () => {
  const querySnapshot = useQuery({
    queryKey: ["all-upcoming-events"],
    queryFn: async () => await getDocs(upcomingEventCollectionRef),
    // enabled: !!forWho,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const data = querySnapshot?.data?.docs?.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
};

export const useCreateBuddyPay = () => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TPayGroup) => addDoc(buddyPayCollectionRef, data),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["all-upcoming-events"] });
    },
  });
};
