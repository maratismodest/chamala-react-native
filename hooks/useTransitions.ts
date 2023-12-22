import { useContext } from 'react';
import {LocaleContext} from "../providers/LocaleProvider";

export default function useTransitions() {
  return useContext(LocaleContext);
}
