import { BadGatewayException, BadRequestException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Instructor, InstructorDocument } from 'src/models/instructor.schema';
import { HashService } from 'src/hash/hash.service';
import { Model } from 'mongoose';
import { MailDto, MultiMailDto } from './dto/mail.dto';

@Injectable()
export class InstructorService {
  logger: Logger;
  constructor(
    @InjectModel(Instructor.name)
    private instructorModel: Model<InstructorDocument>,
    private hashService: HashService,
  ) {
    this.logger = new Logger(InstructorService.name);
  }


  async sendInviteEmail(data: MailDto) {
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
     }
     try{

       const resp = await fetch(`${process.env.EMAIL_SERVICE_ENDPOINT}/send-email`,{
         method:"POST",
         body:JSON.stringify(data),
         headers:headersList
        });
        
        const job = await resp.json();
        
        return job;
      }
      catch(e){
        throw new BadGatewayException("email server is down");
      }
  }

  async sendMultipleInviteEmails(data: MultiMailDto[]) {
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
     }
try{

  const resp = await fetch(`${process.env.EMAIL_SERVICE_ENDPOINT}/send-multiple-emails`,{
    method:"POST",
    body:JSON.stringify(data),
    headers: headersList
  });
  const job = await resp.json();
  
  return job;
}
catch(e){
  throw new BadGatewayException("email server is down");
}
  }





  async registerInstructor(CreateCreateInstructorDto: CreateInstructorDto) {

    // check if Instructor exists
    const Instructor = await this.findByEmail(CreateCreateInstructorDto.email);

    if (Instructor) {
      throw new BadRequestException(
        `Instructor with #${CreateCreateInstructorDto.email} already found`,
      );
    }

    const createInstructor = new this.instructorModel(
      CreateCreateInstructorDto,
    );
    console.log(createInstructor);
    // Hash Password
    createInstructor.password = await this.hashService.hashPassword(
      createInstructor.password,
    );

    const us = await createInstructor.save();
    return {
      message: 'Instructor created successfully',
      status: HttpStatus.CREATED,
      user: {
        email: createInstructor.email,
        id:us?._id
      },
    };
  }

  async create(createinstructorDto: CreateInstructorDto) {
    const existinginstructor = await this.instructorModel
      .findOne({
        email: createinstructorDto.email,
      })
      .exec();
    if (existinginstructor) {
      this.logger.error(`instructor with #${createinstructorDto.email} already found`);
      throw new BadRequestException(
        `instructor with #${createinstructorDto.email} already found`,
      );
    }
    const instructor = await this.instructorModel.create(createinstructorDto);
    return instructor;
  }

  async findAll() {
    const instructorData = await this.instructorModel.find();
    if (!instructorData || instructorData.length == 0) {
      this.logger.error(`instructors data not found!`);
      throw new NotFoundException('instructors data not found!');
    }
    return instructorData;
  }

  async findByEmail(email: string) {
    const existinginstructor = await this.instructorModel.findOne({ email });
    if (!existinginstructor) {
      this.logger.error(`instructor #${email} not found`);
      return null;
    }
    return existinginstructor;
  }

  async getPassByEmail(email: string) {
    const existinginstructor = await this.instructorModel
      .findOne({ email })
      .select('+password').select("+type");
    if (!existinginstructor) {
      this.logger.error(`instructor #${email} not found`);
      return null;
    }
    
    if(existinginstructor.type !="CRED"){
      this.logger.error(`instructor #${existinginstructor.type} login cannot login via cred`);
      return null;
    }

    return existinginstructor;
  }

  async findByDepartment(department: string) {
    const existinginstructor = await this.instructorModel.findOne({ department });
    if (!existinginstructor) {
      this.logger.error(`instructor #${department} not found`);

      return null;
    }
    return existinginstructor;
  }


  async findOne(id: string) {
    const existinginstructor = await this.instructorModel.findById(id);
    if (!existinginstructor) {
      this.logger.error(`instructor #${id} not found`);

      throw new NotFoundException(`instructor #${id} not found`);
    }
    return existinginstructor;
  }

  async update(id: string, updateinstructorDto: UpdateInstructorDto) {
    const existinginstructor = await this.instructorModel.findByIdAndUpdate(
      id,
      updateinstructorDto,
      { new: true },
    );
    if (!existinginstructor) {
      this.logger.error(`instructor #${id} not found`);

      throw new NotFoundException(`instructor #${id} not found`);
    }
    return existinginstructor;
  }

  async remove(id: string) {
    const deletedinstructor = await this.instructorModel.findByIdAndDelete(id);
    if (!deletedinstructor) {
      this.logger.error(`instructor #${id} not found`);
      throw new NotFoundException(`instructor #${id} not found`);
    }
    return deletedinstructor;
  }
}
