import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons/faExpandArrowsAlt';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort';
import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown';
import { faSortUp } from '@fortawesome/free-solid-svg-icons/faSortUp';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';

import { library } from '@fortawesome/fontawesome-svg-core';

library.add(
  faChevronLeft, faChevronRight,
  faSort, faSortDown, faSortUp,
  faExpandArrowsAlt, faTimesCircle,
  faFilter, faRedo,
);
