export interface User {
  username: string;
  role: 'employee' | 'hr';
}

export interface ResignationRequest {
  _id: string;
  employeeId: string;
  lwd: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ExitResponse {
  questionText: string;
  response: string;
}

export interface ExitQuestionnaire {
  employeeId: string;
  responses: ExitResponse[];
}